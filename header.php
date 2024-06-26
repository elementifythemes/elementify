<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Elementify
 */

?>

<!doctype html>

<?php
/**
 * Functions hooked into elementify/before_html action
 *
 */
do_action( 'elementify/before_html' );
?>

<html <?php language_attributes(); ?> <?php elementify_html_attributes(); ?>>

<head>

    <?php
    /**
     * Functions hooked into elementify/head_top action
     *
     */
    do_action( 'elementify/head_top' );
    ?>

    <?php
    /**
     * Functions hooked into elementify/head action
     *
     * @hooked elementify_head_meta - 10
     */
    do_action( 'elementify/head' );
    ?>

    <?php
    /**
     * Functions hooked into elementify/head_bottom action
     *
	 * @hooked elementify_wp_head - 10
     */
    do_action( 'elementify/head_bottom' );
    ?>

</head>

<body 
    <?php 
    body_class();
    /**
     * Functions hooked into elementify/body_attributes action
     *
	 * @hooked elementify_body_attributes - 10
     */
    do_action( 'elementify/body_attributes' );
    ?>
>

<?php
/**
 * Functions hooked into elementify/body_top action
 *
 * @hooked elementify_wp_body_open - 10
 */
do_action( 'elementify/body_top' );
?>

<div id="page" class="site ele-position-relative ele-position-absolute-after">

    <?php
    /**
     * Functions hooked into elementify/before_header action
     *
	 * @hooked elementify_skip_link - 10
     */
    do_action( 'elementify/before_header' );
    ?>

    <?php
    /**
     * Functions hooked into elementify/header action
     *
     * @hooked elementify_header - 10
     */
    do_action( 'elementify/header' );
    // $enable = get_theme_mod( 'elementify_framework_footer_menu_colors');
    // echo '<pre>';
    // print_r($enable);
    // echo '</pre>';
    ?>

    <?php
    /**
     * Functions hooked into elementify/after_header action
     *
     */
    do_action( 'elementify/after_header' );
