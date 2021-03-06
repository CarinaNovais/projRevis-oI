// This is a JavaScript file

window.onload = function (){
  const buscar = document.querySelector("#buscar");
  const buscarQR = document.querySelector("#buscarQR");
  const cep = document.querySelector("#cep");
  const opcoes = {
    method:'GET',
    mode:'cors',
    cache: 'default'
  }
//verifica conexao

function checkConnection() {
    let networkState = navigator.connection.type;

    let states = {};

    states[Connection.NONE] = 0;

    if(states[networkState] == 0){
      return false;
    }else{
      return true;
    }
}

// checkConnection();

function onConfirm(buttonIndex) {
  if(buttonIndex == 1){
    navigator.app.exitApp();
  }else{
    return false;
  }
}




///Primeiro botão
  buscar.addEventListener('click',function(){
       if(checkConnection()){
        function verifica(buttonIndex){
                if (buttonIndex==1){
                    fetch(`https://viacep.com.br/ws/${ cep.value }/json/`,opcoes)
                        .then(response =>{
                            response.json()
                            .then(data =>{
                            document.querySelector("#estado").value = data['uf'];
                            document.querySelector("#cidade").value = data['localidade'];
                            document.querySelector("#bairro").value = data['bairro'];
                            document.querySelector("#rua").value = data['logradouro'];
                            })
                        })

                }else{
                    navigator.vibrate(300)
                    navigator.notification.alert("Saindo do Programa");
                }

                }
                navigator.notification.confirm("Alerta", 
                    verifica,
                    "Tem certeza disso?",
                        ['SIM','NÃO'], 
                );
       }else{
           navigator.notification.confirm(
          'Você está sem conexão! Deseja Sair?', // message
          onConfirm,            // callback to invoke with index of button pressed
          'Erro de conexão',           // title
          ['SIM','NÃO']     // buttonLabels
        );
       }
       });
 


//segundo botao
  buscarQR.addEventListener('click',function(){
       if(checkConnection()){
        cordova.plugins.barcodeScanner.scan(
        function (result) {
            fetch(`https://viacep.com.br/ws/${ result.text }/json/`,opcoes)
        .then(response =>{
            response.json()
            .then(data =>{
            document.querySelector("#estado").value = data['uf'];
            document.querySelector("#cidade").value = data['localidade'];
            document.querySelector("#bairro").value = data['bairro'];
            document.querySelector("#rua").value = data['logradouro'];
            })
        })
        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : false, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: false, // Android, save scan history (default false)
            prompt : "Area de Scan", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: true // iOS and Android
        }
    );
       }else{
           navigator.notification.confirm(
          'Você está sem conexão! Deseja Sair?', // message
          onConfirm,            // callback to invoke with index of button pressed
          'Erro de conexão',           // title
          ['SIM','NÃO']     // buttonLabels
        );
       }
  });

  ///loc atual

function mapa(lat,long){
   L.mapquest.key = 'WttG3ae5icu36vH6g1qUIV18qm2KLJ3G';

        var map = L.mapquest.map('map', {
          center: [lat, long],
          layers: L.mapquest.tileLayer('map'),
          zoom: 12
        });
        map.addControl(L.mapquest.control());
}

  document.querySelector("#local").addEventListener("click", function(){
      navigator.vibrate(100);
      navigator.notification.beep(2);

    var onSuccess = function(position) {
        mapa(position.coords.latitude, position.coords.longitude);
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  });


document.querySelector("#rede").addEventListener("click", function(){
        function checkConnection() {
          var networkState = navigator.connection.type;

          var states = {};
          states[Connection.UNKNOWN]  = 'Unknown connection';
          states[Connection.ETHERNET] = 'Ethernet connection';
          states[Connection.WIFI]     = 'WiFi connection';
          states[Connection.CELL_2G]  = 'Cell 2G connection';
          states[Connection.CELL_3G]  = 'Cell 3G connection';
          states[Connection.CELL_4G]  = 'Cell 4G connection';
          states[Connection.CELL]     = 'Cell generic connection';
          states[Connection.NONE]     = 'No network connection';

          alert('Connection type: ' + states[networkState]);
      }

          checkConnection();

      });








}