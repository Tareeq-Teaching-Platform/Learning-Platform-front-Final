import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Package, Loader2, RefreshCw } from "lucide-react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { API_BASE_URL } from "../../../config/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

DataTable.use(DT);

const OrderHistory = () => {
  const queryClient = useQueryClient();
  const [refundLoading, setRefundLoading] = useState({});
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [refundData, setRefundData] = useState({
    reason: "",
    amount: "",
  });

  // Fetch orders using useQuery
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/orders/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data.orders;
    },
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch order history");
    },
  });

  // Refund mutation
  const refundMutation = useMutation({
    mutationFn: async ({ orderId, captureId, amount, reason }) => {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/payments/paypal/refund`,
        {
          order_id: orderId,
          capture_id: captureId,
          amount: parseFloat(amount),
          reason: reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Refund request submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      closeRefundModal();
    },
    onError: (error) => {
      console.error("Error requesting refund:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to submit refund request";
      toast.error(errorMessage);
    },
  });

  const openRefundModal = (order) => {
    setSelectedOrder(order);
    setRefundData({
      reason: "",
      amount: order.total_price || "",
    });
    setShowRefundModal(true);
  };

  const closeRefundModal = () => {
    setShowRefundModal(false);
    setSelectedOrder(null);
    setRefundData({ reason: "", amount: "" });
  };

  const toggleExpandCourses = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleRefundRequest = async (e) => {
    e.preventDefault();

    if (!refundData.reason.trim()) {
      toast.error("Please provide a reason for the refund");
      return;
    }

    if (!refundData.amount || parseFloat(refundData.amount) <= 0) {
      toast.error("Please provide a valid refund amount");
      return;
    }

    if (!selectedOrder.paypal_capture_id) {
      toast.error("Cannot process refund: Payment capture ID not found");
      return;
    }

    refundMutation.mutate({
      orderId: selectedOrder.order_id,
      captureId: selectedOrder.paypal_capture_id,
      amount: refundData.amount,
      reason: refundData.reason,
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const getStatusBadgeColor = (status) => {
    const statusColors = {
      completed: "badge-success",
      pending: "badge-warning",
      cancelled: "badge-error",
      refunded: "badge-info",
      processing: "badge-secondary",
      failed: "badge-error",
    };
    return statusColors[status?.toLowerCase()] || "badge-ghost";
  };

  // Prepare data for DataTable
  const tableData =
    orders?.map((order) => [
      order.order_id,
      formatDate(order.order_date),
      order.items?.length || 0,
      formatCurrency(order.total_price),
      order.status,
      order, // Pass the whole order object
    ]) || [];

  // Event handler for button clicks in DataTable
  useEffect(() => {
    const handleClick = (e) => {
      // Handle refund button clicks
      if (e.target.closest(".refund-btn")) {
        const orderId = parseInt(
          e.target.closest(".refund-btn").dataset.orderId
        );
        const order = orders?.find((o) => o.order_id === orderId);
        if (order) openRefundModal(order);
      }

      // Handle view courses button clicks
      if (e.target.closest(".view-courses-btn")) {
        const orderId = parseInt(
          e.target.closest(".view-courses-btn").dataset.orderId
        );
        toggleExpandCourses(orderId);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [orders]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );

  return (
    <>
      <div className="overflow-x-auto">
        <DataTable
          data={tableData}
          className="display table table-zebra"
          options={{
            pageLength: 10,
            ordering: true,
            searching: true,
            lengthChange: true,
            info: true,
            columnDefs: [
              {
                targets: 2, // Items column
                render: (data, type, row) => {
                  const order = row[5];
                  return `
                                        <button 
                                            class="btn btn-sm btn-ghost gap-2 view-courses-btn" 
                                            data-order-id="${order.order_id}"
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                            </svg>
                                            ${data} course${
                    data !== 1 ? "s" : ""
                  }
                                        </button>
                                    `;
                },
              },
              {
                targets: 4, // Status column
                render: (data) => {
                  const badgeClass = getStatusBadgeColor(data);
                  return `<span class="badge ${badgeClass}">${data}</span>`;
                },
              },
              {
                targets: 5, // Actions column
                orderable: false,
                searchable: false,
                render: (data, type, row) => {
                  const order = row[5];
                  if (
                    order.status?.toLowerCase() === "completed" &&
                    order.paypal_capture_id
                  ) {
                    return `
                                            <button class="btn bg-red-400 border-0 btn-error btn-sm refund-btn" data-order-id="${order.order_id}">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                                </svg>
                                            </button>
                                        `;
                  }
                  return "";
                },
              },
            ],
          }}
        >
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
        </DataTable>
      </div>

      {/* Course expansion modal */}
      {expandedOrder && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Order Items</h3>
            {orders?.find((o) => o.order_id === expandedOrder)?.items?.length >
            0 ? (
              <div className="grid gap-2">
                {orders
                  ?.find((o) => o.order_id === expandedOrder)
                  ?.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-base-200 p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {item.course_icon && (
                          <img
                            src={item.course_icon}
                            alt={item.course_title}
                            className="w-12 h-12 rounded object-cover"
                          />
                        )}
                        <div>
                          <span className="font-medium">
                            {item.course_title}
                          </span>
                          {item.subject_name && (
                            <div className="text-sm text-base-content/60">
                              {item.subject_name}{" "}
                              {item.level_name && `• ${item.level_name}`}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-success">
                        {formatCurrency(item.price)}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center text-base-content/60 py-8">
                No items in this order
              </div>
            )}
            <div className="modal-action">
              <button className="btn" onClick={() => setExpandedOrder(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {showRefundModal && selectedOrder && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
          onClick={closeRefundModal}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-3 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-bold">Request Refund</h3>
                </div>
                <button
                  onClick={closeRefundModal}
                  disabled={refundMutation.isPending}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-200 transition-colors cursor-pointer"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4">
              {/* Order Summary */}
              <div className="mb-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-semibold">
                      #{selectedOrder.order_id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Amount:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(selectedOrder.total_price)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="text-sm">
                      {formatDate(selectedOrder.order_date)}
                    </span>
                  </div>
                </div>
              </div>

              {selectedOrder.items && selectedOrder.items.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-xs font-semibold text-blue-800 mb-2">
                    Courses in this order:
                  </h4>
                  <ul className="space-y-1">
                    {selectedOrder.items.map((item) => (
                      <li
                        key={item.id}
                        className="text-xs text-blue-700 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                        {item.course_title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleRefundRequest} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Refund Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    max={selectedOrder.total_price}
                    value={refundData.amount}
                    onChange={(e) =>
                      setRefundData({ ...refundData, amount: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="Enter refund amount"
                    required
                    disabled={refundMutation.isPending}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum: {formatCurrency(selectedOrder.total_price)}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Reason for Refund <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="4"
                    value={refundData.reason}
                    onChange={(e) =>
                      setRefundData({ ...refundData, reason: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed resize-none"
                    placeholder="Please explain why you're requesting a refund..."
                    required
                    disabled={refundMutation.isPending}
                  />
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-lg flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span className="text-xs text-yellow-800">
                    Refund requests are subject to review. You will be notified
                    once your request is processed.
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={closeRefundModal}
                    disabled={refundMutation.isPending}
                    className="flex-1 px-4 py-2 text-sm border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={refundMutation.isPending}
                    className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-200 cursor-pointer"
                  >
                    {refundMutation.isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Refund Request"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderHistory;
