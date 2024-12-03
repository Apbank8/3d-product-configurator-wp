<?php
/**
 * Plugin Name: 3D Product Configurator
 * Description: A 3D product configurator built with React and Three.js
 * Version: 1.0.0
 * Author: Your Name
 * Text Domain: 3d-product-configurator
 */

if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('TPC_VERSION', '1.0.0');
define('TPC_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('TPC_PLUGIN_URL', plugin_dir_url(__FILE__));

// Enqueue scripts and styles
function tpc_enqueue_scripts() {
    wp_enqueue_script(
        '3d-product-configurator',
        TPC_PLUGIN_URL . 'build/static/js/main.js',
        array(),
        TPC_VERSION,
        true
    );

    wp_enqueue_style(
        '3d-product-configurator',
        TPC_PLUGIN_URL . 'build/static/css/main.css',
        array(),
        TPC_VERSION
    );
}
add_action('wp_enqueue_scripts', 'tpc_enqueue_scripts');

// Register shortcode
function tpc_shortcode() {
    return '<div id="product-configurator-root"></div>';
}
add_shortcode('product_configurator', 'tpc_shortcode');

// Initialize plugin
function tpc_init() {
    // Add menu page
    add_action('admin_menu', 'tpc_add_menu_page');
}
add_action('init', 'tpc_init');

// Add admin menu page
function tpc_add_menu_page() {
    add_menu_page(
        '3D Product Configurator',
        '3D Configurator',
        'manage_options',
        'product-configurator',
        'tpc_admin_page',
        'dashicons-format-gallery',
        20
    );
}

// Admin page content
function tpc_admin_page() {
    ?>
    <div class="wrap">
        <h1>3D Product Configurator</h1>
        <p>Use the shortcode [product_configurator] to display the 3D product configurator on any page or post.</p>
    </div>
    <?php
}
