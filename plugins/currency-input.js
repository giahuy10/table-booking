import Vue from 'vue'
import VueCurrencyInput from 'vue-currency-input'

Vue.use(VueCurrencyInput, {globalOptions: { 
  currency: null, // only override the default currency 'EUR' with 'USD',
  allowNegative: false,
}})