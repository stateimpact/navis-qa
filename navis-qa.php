<?php
/***
 * Plugin Name: Navis Q&A
 * Description: Style Q&A posts in WordPress
 * Version: 0.1
 * Author: Chris Amico
 * License: GPLv2
***/
/*
    Copyright 2011 National Public Radio, Inc. 

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

class Navis_QA {
        
    function __construct() {
        // add tinymce buttons
        // add admin styles
        // include qa css
        
        add_action('init', array(&$this, 'register_tinymce_filters'));
        add_action('init', array(&$this, 'add_stylesheet'));
    }
    
    function register_tinymce_filters() {
        add_filter('mce_external_plugins', 
            array(&$this, 'add_tinymce_plugin')
        );
        add_filter('mce_buttons', 
            array(&$this, 'register_button')
        );
        add_filter('mce_css', array(&$this, 'mce_css'));
    }
    
    function add_tinymce_plugin($plugins_array) {
        $plugins_array['navis_qa'] = plugins_url(
            'js/tinymce-qa.js', __FILE__);
        return $plugins_array;
    }
    
    function register_button($buttons) {
        array_push($buttons, '|', 'question', 'answer', '|');
        return $buttons;
    }
        
    function add_stylesheet() {
        $css = plugins_url( 'css/qa.css', __FILE__ );
        wp_enqueue_style('qa-styles', $css, array(), '0.1');
    }
    
    function mce_css($mce_css) {
        if (! empty($mce_css)) $mce_css .= ',';
        $mce_css .= plugins_url( 'css/qa-editor.css?v=1', __FILE__ );
        return $mce_css;
    }
    
}

new Navis_QA;

?>