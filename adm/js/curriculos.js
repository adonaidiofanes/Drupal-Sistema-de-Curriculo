// @adonaidiofanes

(function ($) {

	$(function() {

		/*
		* Validar email ao sair do campo
		*/
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

				var iTabela  = "<table border=1 style='width:300px;'><thead><td>Data</td><td>Vaga</td></thead><tbody>";
				var fTabela  = "</tbody></table>";

				if(data.nodes.length > 0){

				    $.each(data.nodes, function() {
				    	var res = "";
				        $.each(this, function(k, v) {
							res = miolo.replace("@data", v.data_vaga);
							res = res.replace("@vaga", v.title);
							$("#resultados").append(res);
				        });

				    });

				    $("#resultados tr").wrapAll( "<table border='1'>");

			    } else {
			    	$("#resultados").html("<span class='curtir'><img src='http://cdn.osxdaily.com/wp-content/uploads/2013/07/dancing-banana.gif' width='50px'>Eu curti esse email! Pode prosseguir...</span>");
			    }
			});
			$("#carregando").hide("slow");
		} // Final getNodes

		/*
		* Preencher o email quando adicionamos a vaga
		*/
		if( $("body").hasClass("page-node-add-vaga") ){
			$("#edit-body-und-0-value").on('blur',function(){
    			var corpo = CKEDITOR.instances['edit-body-und-0-value'].getData();
    				
    			var email = $("#edit-field-email-und-0-email").val();
				if( (corpo != "") && (email == "") ){

    				corpo = corpo.replace("<p><br />", '<p>')
    							 .replace(/<p>&nbsp;/g, "<p>")
    							 .replace(/&nbsp; &nbsp;/g, "&nbsp;")
    							 .replace(/&nbsp;&nbsp;&nbsp;/g, "&nbsp;")
    							 .replace(/&nbsp;&nbsp;/g, "&nbsp;")
    							 .replace(/• /g, '')
    							 .replace(/Benefícios:/g, "<b>BENEFÍCIOS</b>")
    							 .replace(/Salário:/g, "<b>SALÁRIO:</b>")
    							 .replace("VT", 'Vale Transporte')
    							 .replace("Horário", "<b>INFORMAÇÕES ADICIONAIS:<br>Horário</b>")
    							 .replace("Requisitos", "<b>REQUISITOS</b>")
    							 .replace("REQUISITOS:","<b>REQUISITOS:</b>")
    							 .replace("ATIVIDADES:","<b>ATIVIDADES:</b>")
    							 .replace("Atividades","<b>ATIVIDADES</b>")
    							 .replace("Local", "<b>LOCAL</b>")
    							 .replace(/ü /g, "")
    							 .replace(/CURRÍCULOS FORA DO PERFIL NÃO SERÃO ANALISADOS! /g, "");


    				CKEDITOR.instances['edit-body-und-0-value'].setData(corpo);


    				corpo = $(corpo).text().toLowerCase();
					
					var arromba = corpo.indexOf("@");
					if(arromba > -1){

						var ex1 = corpo.split("@");
						if( ex1.length == 2 ){
							var p1 = ex1[0].split(" ");
							var p2 = ex1[1].split(" ");

							var email  = p1[p1.length-1];
								email += "@";
								email += p2[0];

								email = email.replace(".br,", '.br')
											 .replace(".com,", ".com")	
											 .replace("para ", "")
											 .replace("para: ", "")
											 .replace(".br colocando",".br")
											 .replace(".com colocando",".com")
											 .replace(".br com",".br")
											 .replace(".com com",".com")
											 .replace("para:","")
											 .replace("email: ","")
											 .replace(".br - ",".br")
											 .replace(".com - ",".com")
											 .replace(".br informando",".br")
											 .replace(".com informando",".com")
											 .replace(".brcolocar",".br")
											 .replace(".comcolocar",".com")
											 .replace(".br ,",".br")
											 .replace(".com ,",".com")
											 .replace(".com ",".com");
											 .replace(".br ",".br");


							$("#edit-field-email-und-0-email").val(email);
							getNodes(email);

						}
					} // Final da verificacao de email
				} // Montagem do corpo

				// Adicionar Zona, cidade, estado
				
				// CIDADES
				var cidade = $("#edit-field-cidade-und-0-value").val();
				if( (corpo != "") && (cidade == "") ){
					var arrRJ = ["rj",
								 "rio de janeiro",
								 "carioca",
								 "nova iguaçu",
								 "jardim botânico",
								 "botafogo",
								 "ipanema",
								 "barra da tijuca"];

						cidades(arrRJ, corpo, "Rio de Janeiro", "RJ");

					var arrSaoGoncalo = ["são gonçalo"];
						cidades(arrSaoGoncalo, corpo, "São Gonçalo", "RJ");

					var arrNiteroi = ["niterói"];
						cidades(arrNiteroi, corpo, "Niterói", "RJ");

					var arrSP = ["campinas","são paulo"];
						cidades(arrSP, corpo, "São Paulo", "SP");

					var arrMG = ["bh","belo horizonte", "minas gerais","alfenas","contagem"];
						cidades(arrMG, corpo, "Minas Gerais", "MG");

					var arrCE = ["fortaleza","ceará","ceara"];
						cidades(arrCE, corpo, "Fortaleza", "CE");
						
					var arrPE = ["recife"];
						cidades(arrPE, corpo, "Recife", "PE");

				} // Final cidades

				// CIDADES
				var bairro = $("#edit-field-bairro-und-0-value").val();
				if( (corpo != "") && (bairro == "") ){
					var arrRJ = [];
					arrRJ.push(["copacabana","Copacabana", "Zona Sul"]);
					arrRJ.push(["ipanema", "Ipanema", "Zona Sul"]);
					arrRJ.push(["botafogo", "Botafogo", "Zona Sul"]);
					arrRJ.push(["barra da tijuca", "Barra da Tijuca", "Zona Oeste"]);
					arrRJ.push(["jardim botânico", "Jardim Botânico", "Zona Sul"]);

					bairros(arrRJ, corpo);
				}

			});
		}

		function cidades(arr, corpo, nomeCidade, nomeEstado){
			for (var i = arr.length - 1; i >= 0; i--) {
				var n = corpo.indexOf(arr[i]);
				if(n > -1){ 
					$("#edit-field-cidade-und-0-value").val(nomeCidade); 
					$("#edit-field-estado-und").val(nomeEstado);
					break; 
				}
			};
		}

		function bairros(arr, corpo){
			for (var i = arr.length - 1; i >= 0; i--) {
				var n = corpo.indexOf(arr[i][0]);

				if(n>1){
					$("#edit-field-bairro-und-0-value").val(arr[i][1]);
					$("#edit-field-zona-und-0-value").val(arr[i][2]);
				}

/*
[Array[3], Array[3], Array[3]]
0: Array[3]
0: "copacabana"
1: "Copacabana"
2: "Zona Sul"
length: 3
*/			
				//var n = corpo.indexOf(arr[i]);
				/*if(n > -1){ 
					$("#edit-field-bairro-und-0-value").val(arr[i][0]); 
					break; 
				}*/
			};
		}



	}) // fim da funcao jquery);

})(jQuery);