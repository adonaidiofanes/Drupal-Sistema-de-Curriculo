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
    							 .replace(/&nbsp;&nbsp;/g, '')
    							 .replace(/&nbsp; &nbsp;/g, "&nbsp;")
    							 .replace(/&nbsp;&nbsp;&nbsp;/g, "&nbsp;")
    							 .replace(/&nbsp;&nbsp;/g, "&nbsp;")
    							 .replace(/• /g, '')
    							 .replace(/Benefícios:/g, "<b>BENEFÍCIOS</b>")
    							 .replace(/Salário:/g, "<b>SALÁRIO:</b>")
    							 .replace("VT", 'Vale Transporte')
    							 .replace("VR", 'Vale Refeição')
    							 .replace("Horário", "<b>INFORMAÇÕES ADICIONAIS:<br>Horário</b>")
    							 .replace("Requisitos", "<b>REQUISITOS</b>")
    							 .replace("REQUISITOS:","<b>REQUISITOS:</b>")
    							 .replace("ATIVIDADES:","<b>ATIVIDADES:</b>")
    							 .replace("Atividades","<b>ATIVIDADES</b>")
    							 .replace("Local", "<b>LOCAL</b>")
    							 .replace(/ü /g, "")
    							 .replace(/CURRÍCULOS FORA DO PERFIL NÃO SERÃO ANALISADOS! /g, "")
    							 .replace(/Ø&nbsp;/g, "")
    							 .replace(/Ø /g, "")
    							 .replace(/Ø/g, "")
    							 .replace(/·  /g, "")
    							 .replace(/·&nbsp;/g, "")
    							 .replace(/INTERESSADOS ENCAMINHAREM CURRICULO INFORMANDO NO ASSUNTO O NOME DA VAGA PARA O E-MAIL /g, "")
    							 .replace(/Interessados encaminhar currículos para:/g, "")
    							 .replace(/Enviar currículo para:/g, "");
    							 //.replace(/\s+/g, '------'); // Subistitur todos espacos
    							 //.replace(/\+/g, "_________"); // subistitui sinal +

    							 CKEDITOR.instances['edit-body-und-0-value'].setData(corpo);


    				var CorpoCorreto = corpo;

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
											 .replace(".com ",".com")
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

					var arrSaoGoncalo = ["são gonçalo"];
						cidades(arrSaoGoncalo, corpo, "São Gonçalo", "RJ");

					var arrNiteroi = ["niterói"];
						cidades(arrNiteroi, corpo, "Niterói", "RJ");


					// ########## Baixada Fluminense

					var arrDqCaxias = ["duque de caxias"];
						cidades(arrDqCaxias, corpo, "Duque de Caxias", "RJ");

					var arrNIguacu = ["nova iguaçu"];
						cidades(arrNIguacu, corpo, "Nova Iguaçu", "RJ");

					var arrNilopolis = ["nilópolis"];
						cidades(arrNilopolis, corpo, "Nilópolis", "RJ");
						
					var arrNilopolis = ["nilópolis"];
						cidades(arrNilopolis, corpo, "Nilópolis", "RJ");

					var arrSaoJoao = ["são joão de meriti"];
						cidades(arrSaoJoao, corpo, "São João de Meriti", "RJ");

					var arrBeld = ["belford roxo"];
						cidades(arrBeld, corpo, "Belford Roxo", "RJ");

					var arrMage = ["magé"];
						cidades(arrMage, corpo, "Magé", "RJ");

					var arrJaperi = ["japeri"];
						cidades(arrJaperi, corpo, "Japeri", "RJ");

					var arrGuapimirim = ["guapimirim"];
						cidades(arrGuapimirim, corpo, "Guapimirim", "RJ");

					var arrMesquita = ["mesquita"];
						cidades(arrMesquita, corpo, "Mesquita", "RJ");

					var arrItaguai = ["itaguaí"];
						cidades(arrItaguai, corpo, "Itaguaí", "RJ");

					var arrSeropedica = ["seropédica"];
						cidades(arrSeropedica, corpo, "Seropédica", "RJ");

					// ########## Final Baixada Fluminense


					var arrVilaIsabel = ["vila isabel"];
						cidades(arrVilaIsabel, corpo, "Rio de Janeiro", "RJ");

					var arrSaoCristovao = ["são cristóvão"];
						cidades(arrSaoCristovao, corpo, "Rio de Janeiro", "RJ");

					var arrSP = ["são paulo"];
						cidades(arrSP, corpo, "São Paulo", "SP");

					var arrCampinas = ["campinas"];
						cidades(arrCampinas, corpo, "Campinas", "SP");

					var arrMG = ["minas gerais","alfenas","contagem"];
						cidades(arrMG, corpo, "Minas Gerais", "MG");

					var arrMG_BH = ["bh","belo horizonte"];
						cidades(arrMG_BH, corpo, "Belo Horizonte", "MG");

					var arrCE = ["fortaleza","ceará","ceara"];
						cidades(arrCE, corpo, "Fortaleza", "CE");

					var arrPE = ["recife"];
						cidades(arrPE, corpo, "Recife", "PE");

					var arrAldeota = ["aldeota"];
						cidades(arrAldeota, corpo, "Fortaleza", "CE");

					var arrRJ = ["rj",
								 "rio de janeiro",
								 "carioca",
								 "jardim botânico",
								 "botafogo",
								 "ipanema",
								 "barra da tijuca"];

						cidades(arrRJ, corpo, "Rio de Janeiro", "RJ");					

				} // Final cidades

				// CIDADES
				var bairro = $("#edit-field-bairro-und-0-value").val();
				if( (corpo != "") && (bairro == "") ){
					
					var arrRJ = [];

					// Zona Sul
					arrRJ.push(["copacabana","Copacabana", "Zona Sul"]);
					arrRJ.push(["ipanema", "Ipanema", "Zona Sul"]);
					arrRJ.push(["botafogo", "Botafogo", "Zona Sul"]);
					arrRJ.push(["jardim botânico", "Jardim Botânico", "Zona Sul"]);
					arrRJ.push(["leblon", "Leblon", "Zona Sul"]);
					arrRJ.push(["glória", "Glória", "Zona Sul"]);
					arrRJ.push(["urca", "Urca", "Zona Sul"]);
					arrRJ.push(["catete", "Catete", "Zona Sul"]);
					arrRJ.push(["cosme velho", "Cosme Velho", "Zona Sul"]);
					arrRJ.push(["flamengo", "Flamengo", "Zona Sul"]);
					arrRJ.push(["gávea", "Gávea", "Zona Sul"]);
					arrRJ.push(["humaitá", "Humaitá", "Zona Sul"]);
					arrRJ.push(["laranjeiras", "Laranjeiras", "Zona Sul"]);

					// Zona Oeste
					arrRJ.push(["barra da tijuca", "Barra da Tijuca", "Zona Oeste"]);
					arrRJ.push(["bangú", "Bangú", "Zona Oeste"]);
					arrRJ.push(["bangu", "Bangu", "Zona Oeste"]);
					arrRJ.push(["campo grande", "Campo Grande", "Zona Oeste"]);
					arrRJ.push(["jacarepaguá", "Jacarepaguá", "Zona Oeste"]);
					arrRJ.push(["realengo‎", "Realengo‎", "Zona Oeste"]);
					arrRJ.push(["santa cruz", "Santa Cruz", "Zona Oeste"]);
					arrRJ.push(["recreio dos bandeirantes", "Recreio dos Bandeirantes", "Zona Oeste"]);
					arrRJ.push(["curicica", "Curicica", "Zona Oeste"]);

					// Baixada Fluminense
					arrRJ.push(["duque de caxias", "", "Baixada Fluminense"]);
					arrRJ.push(["nova iguaçu", "", "Baixada Fluminense"]);
					arrRJ.push(["nilópolis", "", "Baixada Fluminense"]);
					arrRJ.push(["são joão de meriti", "", "Baixada Fluminense"]);
					arrRJ.push(["belford roxo", "", "Baixada Fluminense"]);
					arrRJ.push(["magé", "", "Baixada Fluminense"]);
					arrRJ.push(["japeri", "", "Baixada Fluminense"]);
					arrRJ.push(["guapimirim", "", "Baixada Fluminense"]);
					arrRJ.push(["mesquita", "", "Baixada Fluminense"]);
					arrRJ.push(["itaguaí", "", "Baixada Fluminense"]);
					arrRJ.push(["seropédica", "", "Baixada Fluminense"]);

					// Zona Norte
					arrRJ.push(["olaria", "Olaria", "Zona Norte"]);
					arrRJ.push(["vila isabel", "Vila Isabel", "Zona Norte"]);
					arrRJ.push(["ilha do governador", "Ilha do Governador", "Zona Norte"]);
					arrRJ.push(["bonsucesso‎", "Bonsucesso‎", "Zona Norte"]);
					arrRJ.push(["campinho", "Campinho‎", "Zona Norte"]);
					arrRJ.push(["engenho de dentro‎", "Engenho de Dentro‎", "Zona Norte"]);
					arrRJ.push(["irajá‎", "Irajá‎", "Zona Norte"]);
					arrRJ.push(["madureira‎", "Madureira‎", "Zona Norte"]);
					arrRJ.push(["méier‎", "Méier‎", "Zona Norte"]);
					arrRJ.push(["olaria‎", "Olaria‎", "Zona Norte"]);
					//arrRJ.push(["penha", "Penha", "Zona Norte"]);
					arrRJ.push(["pilares", "Pilares", "Zona Norte"]);
					arrRJ.push(["ramos", "Ramos", "Zona Norte"]);
					arrRJ.push(["rocha miranda", "Rocha Miranda", "Zona Norte"]);
					arrRJ.push(["são cristóvão", "São Cristóvão", "Zona Norte"]);
					arrRJ.push(["del castilho", "Del Castilho", "Zona Norte"]);
					arrRJ.push(["pavuna", "Pavuna", "Zona Norte"]);

					// Outros
					arrRJ.push(["aldeota", "Aldeota", ""]);

					bairros(arrRJ, corpo);
				}

				// Pretensão salarial				
				if ( corpo.match( /(pretenção|pretensão)/ ) ) {
					$('#edit-field-pretencao-salarial-und').prop('checked', true);
				}

				/*var verificaCorpo = CKEDITOR.instances['edit-body-und-0-value'].getData();
				if( !verificaCorpo.match(/(EMPRESA CONTRATA)/) && verificaCorpo != "" ){
					// Adicionar info adicionais
					var iTitulo = $("#edit-title").val();
					var iEstado = $("#edit-field-estado-und option:selected" ).text();
					var iCidade = $("#edit-field-cidade-und-0-value").val();
					var iBairro = $("#edit-field-bairro-und-0-value").val();
					var iZona = $("#edit-field-zona-und-0-value").val();

					var especificacoes = "<p><b>EMPRESA CONTRATA ";

						if( iTitulo != "" ){ especificacoes += iTitulo + " "; }
						if( iCidade != "" ){ especificacoes += "PARA TRABALHAR EM " + iCidade + " "; }
						if( (iEstado != "") && (iEstado != "- Nenhum -") ){ especificacoes += "/ " + iEstado + " "; }
						if( iBairro != "" ){ especificacoes += "NO BAIRRO " + iBairro + " "; }
						if( iZona != "" ){ especificacoes += "NA " + iZona + " "; }
						especificacoes += "</b></p>";

					CorpoCorreto = especificacoes + CorpoCorreto;

					CKEDITOR.instances['edit-body-und-0-value'].setData(CorpoCorreto);
				}*/

			});
		}

		function cidades(arr, corpo, nomeCidade, nomeEstado){
			for (var i = arr.length - 1; i >= 0; i--) {
				var n = corpo.indexOf(arr[i]);
				if(n > -1){ 
					
					if( $("#edit-field-cidade-und-0-value").val() == "" ){
						$("#edit-field-cidade-und-0-value").val(nomeCidade); 
					}

					$("#edit-field-estado-und").val(nomeEstado);

					break; 
				}
			};
		}

		function bairros(arr, corpo){
			for (var i = arr.length - 1; i >= 0; i--) {
				var n = corpo.indexOf(arr[i][0]);

				if(n>1){

					if ( $("#edit-field-bairro-und-0-value").val() == "" ) {
						$("#edit-field-bairro-und-0-value").val(arr[i][1]);
					}

					if( $("#edit-field-zona-und-0-value").val(arr[i][2]) == "" ){
						$("#edit-field-zona-und-0-value").val(arr[i][2]);
					}

				}
			};
		}



	}) // fim da funcao jquery);

})(jQuery);