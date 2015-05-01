// @adonaidiofanes

(function ($) {

	$(function() {

		$("#edit-field-email-und-0-email").on('blur',function(){
			var email = $(this).val();
			if(email != ""){
				getNodes(email);
			}
		});

	function getNodes(email){

		var carregando = "<div style='text-align:center;'><img src='" + Drupal.settings.basePath + "sites/all/modules/custom/curriculos/img/carregando.gif'></div>";

		$("#resultados").html("");

		$("#carregando").html(carregando);
		$("#carregando").show("slow");


		var miolo    = "<tr><td class='td_data'>@data</td><td class='td_vaga'>@vaga</td></tr>";

		$.getJSON(Drupal.settings.basePath + "json/" + email, function(data){
			//var retorno = "";

			var iTabela  = "<table border=1 style='width:300px;'><thead><td>Data</td><td>Vaga</td></thead><tbody>";
			var fTabela  = "</tbody></table>";

		    $.each(data.nodes, function() {
		    	var res = "";
		        $.each(this, function(k, v) {
					res = miolo.replace("@data", v.date);
					res = res.replace("@vaga", v.title);
					$("#resultados").append(res);
		        });

		    });

		    $("#resultados tr").wrapAll( "<table border='1'>");

		});

		$("#carregando").hide("slow");

	}

	}) // fim da funcao jquery

})(jQuery);