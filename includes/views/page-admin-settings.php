<?php
namespace AspireUpdate;

$options_base = $args['options_base'] ?? '';
$reset_url    = $args['reset_url'] ?? '';
$option_group = $args['option_group'] ?? '';
?>
<div class="wrap">
	<h1><?php esc_html_e( 'AspireUpdate Settings', 'aspireupdate' ); ?></h1>
	<form id="aspireupdate-settings-form" method="post" action="<?php echo esc_url( network_admin_url( $options_base ) ); ?>?page=aspireupdate-settings">
		<?php
		settings_fields( $option_group );
		do_settings_sections( 'aspireupdate-settings' );
		?>
		<p class="submit">
			<?php wp_nonce_field( 'aspireupdate-settings' ); ?>
			<?php submit_button( '', 'primary', 'submit', false ); ?>
			<a href="<?php echo esc_url( $reset_url ); ?>" class="button button-secondary" ><?php esc_html_e( 'Reset', 'aspireupdate' ); ?></a>
			<button type="button" id="aspireupdate-button-clearlog" class="button button-secondary button-clearlog" ><?php esc_html_e( 'Clear Log', 'aspireupdate' ); ?></button>
			<button type="button" id="aspireupdate-button-viewlog" class="button button-secondary button-viewlog" ><?php esc_html_e( 'View Log', 'aspireupdate' ); ?></button>
		</p>
	</form>
	<div id="aspireupdate-log-viewer">
		<div class="outer">
			<span class="close"></span>
			<div class="inner">
			</div>
		</div>
	</div>
	<?php Utilities::include_file( 'voltron.txt' ); ?>
</div>
