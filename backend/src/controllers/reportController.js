import { query } from '../config/db.js';

export const getReportSummary = async (req, res, next) => {
  try {
    // 1. Total Pendapatan dan Total Transaksi
    const statsResult = await query(`
      SELECT 
        COALESCE(SUM(total), 0) as total_revenue,
        COUNT(*) as total_orders,
        COUNT(*) FILTER (WHERE status = 'COMPLETED') as completed_orders,
        COUNT(*) FILTER (WHERE status = 'PENDING') as pending_orders,
        COUNT(*) FILTER (WHERE status = 'CANCELLED') as cancelled_orders
      FROM orders;
    `);

    // 2. Menu Terlaris (Top 5 Best Seller)
    const topMenusResult = await query(`
      SELECT 
        oi.menu_name,
        COALESCE(SUM(oi.quantity), 0)::int as total_sold,
        COALESCE(SUM(oi.subtotal), 0) as revenue_generated
      FROM order_items oi
      GROUP BY oi.menu_name
      ORDER BY total_sold DESC
      LIMIT 5;
    `);

    // 3. Pesanan Terbaru
    const recentOrdersResult = await query(`
      SELECT id, order_code, customer_name, table_number, total, status, created_at
      FROM orders
      ORDER BY created_at DESC
      LIMIT 5;
    `);

    const stats = statsResult.rows[0];

    res.json({
      success: true,
      summary: {
        totalRevenue: parseFloat(stats.total_revenue),
        totalOrders: parseInt(stats.total_orders, 10),
        completedOrders: parseInt(stats.completed_orders, 10),
        pendingOrders: parseInt(stats.pending_orders, 10),
        cancelledOrders: parseInt(stats.cancelled_orders, 10)
      },
      topSellingMenus: topMenusResult.rows,
      recentOrders: recentOrdersResult.rows
    });
  } catch (error) {
    next(error);
  }
};
