// @adonaidiofanes

(function ($) {

	$(function() {

		var carregando = "<div style='text-align:center;'><img src='" + Drupal.settings.basePath + "sites/all/modules/custom/curriculos/img/carregando.gif'><h1>ENVIANDO SEU CURRÍCULO!<BR>AGUARDE!</h1></div>";

		$("#enviar_cv").on('click',function(){

			$.colorbox({
				html: carregando,
				escKey: false, 
				overlayClose: false, 
				closeButton: false,
				width: 500,
				scrolling: false}
			);

		});

	}) // fim da funcao jquery

})(jQuery);