var app = new Vue({
    el: '#app',
    data: {
      //***** Editables *****
      coinsInicial: 9999999, // Saldo inicial en número
      avatarURL: './img/cofre.jpg',
      nickName: 'TIKTOK COIN SALDO',
      nroTarjetaEnd: '4421',
  
      //******* No Tocar we *******
      precioCoin: 0.010571,
      sumaActual: 0,
      isInput: false,
      inputCoins: '',
      flagPersonalizado: 1,
      selectedButton: -1,
      costoTotal: 0,
      isButtonBuyDisabled: true,
      btnCargando: false,
      modalOpen: false,
      modalOpen2: false,
      btnPayNow: false,
      pagandoCoins: false,
      UsuarioPremiado: '',
      buscandoUsuario: false,
      usuarioEncontradoShow: false,
      usuarioEncontrado: false,
      listaCoinsD: [
        { name: 'c1', monto: 70, precio: 0.74 },
        { name: 'c2', monto: 350, precio: 3.7 },
        { name: 'c3', monto: 700, precio: 7.4 },
        { name: 'c4', monto: 1400, precio: 14.8 },
        { name: 'c5', monto: 3500, precio: 37 },
        { name: 'c6', monto: 7000, precio: 74 },
        { name: 'c7', monto: 17500, precio: 185 },
      ],
      // Registro de transacciones
      transactions: []
    },
  
    methods: {
      calculoPrecio1: function (btn) {
        if (this.flagPersonalizado == 1) {
          this.isButtonBuyDisabled = false;
          // Asigna el monto del paquete seleccionado al input (como cadena)
          this.inputCoins = this.listaCoinsD[btn - 1].monto.toString();
          this.costoTotal = this.listaCoinsD[btn - 1].precio;
        }
      },
      calculoPrecio2: function (suma) {
        if (suma) {
          if (this.flagPersonalizado == 2) {
            console.log('++++++++++++++++++++++++++++');
            console.log('precioCoin:' + '(' + typeof this.precioCoin + ')' + this.precioCoin);
            console.log('Suma:' + '(' + typeof suma + ')' + suma);
            console.log('++++++++++++++++++++++++++++');
            this.costoTotal = (this.precioCoin * suma).toFixed(2);
          }
        } else {
          if (this.flagPersonalizado == 2) {
            console.log('++++++++++++++++++++++++++++');
            console.log('precioCoin:' + '(' + typeof this.precioCoin + ')' + this.precioCoin);
            console.log('Suma:' + '(' + typeof suma + ')' + suma);
            console.log('++++++++++++++++++++++++++++');
            this.costoTotal = (this.precioCoin * this.sumaActual).toFixed(2);
          }
        }
      },
      handleClick: function (flag, btn) {
        // Reiniciar input y costo total al hacer clic
        this.inputCoins = '';
        this.costoTotal = 0;
  
        // Flag 1: botones predefinidos, Flag 2: input personalizado
        if (flag == 1) {
          this.flagPersonalizado = 1;
        } else if (flag == 2) {
          this.flagPersonalizado = 2;
          this.isButtonBuyDisabled = true;
        }
  
        this.selectedButton = btn;
        this.buttonClass(btn);
        if (flag == 1) {
          this.calculoPrecio1(btn);
        }
        // Si es el botón 8 (personalizado), enfocamos el input
        if (btn == 8) {
          setTimeout(() => {
            this.$refs.inputCoin.focus();
          }, 100);
        }
      },
      validateInput(e) {
        const min = 30;
        const max = 250000000;
        console.log('++++++++++++++++++++++++++++');
        console.log('Valor actual: ' + '(' + typeof this.inputCoins + ')' + this.inputCoins);
        console.log('valor ingresado:' + '(' + typeof e.key + ')' + e.key);
        let suma = parseInt(this.inputCoins + e.key);
        console.log('Valor suma: ' + '(' + typeof suma + ')' + suma);
        console.log('++++++++++++++++++++++++++++');
        if (suma < 0 || suma == 0 || suma >= max || isNaN(suma) || isNaN(e.key)) {
          e.preventDefault();
          console.warn('se ha prevenido: ' + e.key);
        } else if (suma < min) {
          this.isButtonBuyDisabled = true;
        } else {
          this.isButtonBuyDisabled = false;
          console.log(suma.toLocaleString());
          console.info('se definio valor:' + e.key);
          this.calculoPrecio2(suma);
        }
      },
      buttonClass: function (btn2) {
        if (btn2 == 8) {
          if ((this.inputCoins < 30 && this.inputCoins != '') || (this.inputCoins > 2500000)) {
            return 'tiktok-red-ButtonContainer';
          } else {
            return this.selectedButton === btn2 ? 'tiktok-yellow-ButtonContainer' : 'tiktok-black-ButtonContainer';
          }
        } else {
          return this.selectedButton === btn2 ? 'tiktok-yellow-ButtonContainer' : 'tiktok-black-ButtonContainer';
        }
      },
      comprarMonedas: function () {
        let btnComprarMonedas = document.getElementById('btnComprarMonedas');
        this.isButtonBuyDisabled = true;
        btnComprarMonedas.innerHTML = `<div class="tiktok-120zvcm-DivContainer ef2t4c20 tiktok-spinin-svg"
                                            style="position: absolute; top:28%; transform: translateY(-50%); width: 18px; height: 18px;">
                                            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" class="tiktok-10hufzs-SvgBox ef2t4c21">
                                                <path fill-rule="evenodd" clip-rule="evenodd" fill="rgba(255, 255, 255, 1)"
                                                    d="M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 9.82843 17.3284 10.5 16.5 10.5C15.6716 10.5 15 9.82843 15 9C15 5.68629 12.3137 3 9 3C5.68629 3 3 5.68629 3 9C3 12.3137 5.68629 15 9 15C10.415 15 11.7119 14.512 12.7375 13.6941C13.3852 13.1775 14.329 13.2838 14.8455 13.9315C15.3621 14.5792 15.2558 15.5229 14.6081 16.0395C13.0703 17.266 11.1188 18 9 18C4.02944 18 0 13.9706 0 9Z">
                                                </path>
                                            </svg>
                                        </div>`;
        setTimeout(() => {
          btnComprarMonedas.innerHTML = 'Recargar';
          this.isButtonBuyDisabled = false;
          this.modalOpen = true;
          setTimeout(() => {
            this.btnPayNow = true;
          }, (Math.floor(Math.random() * 3) + 1) * 1000);
        }, (Math.floor(Math.random() * 3) + 1) * 1000);
      },
      closeModal: function () {
        this.modalOpen = false;
        this.btnPayNow = false;
      },
      animacionPago: function () {
        console.log('click' + this.btnPayNow);
        this.btnPayNow = false;
        this.pagandoCoins = true;
        setTimeout(() => {
          // Finalizar proceso de pago: cerrar modal, confirmar pago, actualizar saldo y registrar transacción
          this.closeModal();
          this.modalConfirmado();
          let coinsPurchased = parseInt(this.inputCoins);
          if (!isNaN(coinsPurchased)) {
            // Descontar el saldo
            this.coinsInicial -= coinsPurchased;
            // Registrar la transacción
            this.transactions.push({
              amount: coinsPurchased,
              cost: this.costoTotal,
              date: new Date().toLocaleString()
            });
          }
          // Resetear valores de entrada y selección
          this.inputCoins = '';
          this.costoTotal = 0;
          this.selectedButton = -1;
          this.pagandoCoins = false;
          // Guardar el estado actualizado en localStorage
          this.saveState();
        }, (Math.floor(Math.random() * 4) + 3) * 1000);
      },
      modalConfirmado: function () {
        this.modalOpen2 = true;
      },
      closeModalPagado: function () {
        this.modalOpen2 = false;
        this.UsuarioPremiado = '';
        this.usuarioEncontradoShow = false;
      },
      handleUsernameInput: function (e) {
        this.usuarioEncontrado = false;
        if (this.UsuarioPremiado.length > 4) {
          this.usuarioEncontradoShow = false;
          this.buscandoUsuario = true;
          console.log('Usuario:' + this.buscandoUsuario);
          setTimeout(() => {
            this.usuarioEncontrado = true;
            this.buscandoUsuario = false;
          }, 2000);
        } else {
          this.usuarioEncontrado = false;
          this.buscandoUsuario = false;
        }
      },
      // Método para guardar saldo y transacciones en localStorage
      saveState: function () {
        localStorage.setItem('coinsInicial', this.coinsInicial);
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
      },
      // Método para cargar el estado guardado
      loadState: function () {
        let storedCoins = localStorage.getItem('coinsInicial');
        let storedTransactions = localStorage.getItem('transactions');
        if (storedCoins) {
          this.coinsInicial = parseInt(storedCoins);
        }
        if (storedTransactions) {
          this.transactions = JSON.parse(storedTransactions);
        }
      }
    },
    computed: {
      errorText: function () {
        if (this.inputCoins < 30)
          return 'Minimo: 30';
        if (this.inputCoins > 2500000)
          return 'Maximo: 2,500,500';
        return '';
      },
      formattedCoinsInicial: function () {
        return this.coinsInicial.toLocaleString();
      }
    },
    created: function () {
      this.loadState();
    }
  });
  