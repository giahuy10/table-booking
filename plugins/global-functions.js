
import moment from 'moment';
export default ({context, store}, inject) => {
  // Format number (Money)
  const formatNumber = (number) => new Intl.NumberFormat('en-US', {}).format(number)
  inject('formatNumber', formatNumber)

  // Unit (Money)
  const unitMoney = () => 'VND'
  inject('unitMoney', unitMoney)

  // Format date MM.DD.YYYY
  const formatDate = (date) => date !== null ? moment(date).format('MM.DD.YYYY') : '';
  inject('formatDate', formatDate)

  // Format date MM.DD.YYYY
  const formatDateTime = (date) => date !== null ? moment(date).format('MM.DD.YYYY H:m') : '';
  inject('formatDateTime', formatDateTime)

  // Format date YYYY-MM-DD
  const formatDateYMD = (date) => date !== null ? moment(date).format('YYYY-MM-DD') : '';
  inject('formatDateYMD', formatDateYMD)

  // Format date DD/MM/YYYY
  const formatDateDMY = (date) => date !== null ? moment(date).format('DD/MM/YYYY') : '';
  inject('formatDateDMY', formatDateDMY)

  // Check null or ''
  const isNullOrEmpty = (numberString) => {
    let isNullEmpty = false;
    if(numberString == null || numberString == ''){
      isNullEmpty = true;
    }
    return isNullEmpty
  };
  inject('isNullOrEmpty', isNullOrEmpty)

  // Format phone number

  const formatPhoneNumber = (phoneNumberString) => {
    /*var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3]
    }else{
      return phoneNumberString
    }*/
    var phone = '';
    var phone1 = phoneNumberString.substr(0, 3);
    var phone2 = phoneNumberString.substr(3, 3);
    var phone3 = phoneNumberString.substr(6, 4);
    if(phone1 != ''){
      phone += phone1;
    }
    if(phone2 != ''){
      phone += '-' + phone2;
    }
    if(phone3 != ''){
      phone += '-' + phone3;
    }
    return phone;
  };
  inject('formatPhoneNumber', formatPhoneNumber)

  // Round number
  const roundNumber = (number) => Math.round(number);
  inject('roundNumber', roundNumber)

  //Show corporate card
  const showCorporateCard = (card) => {
    let showCard = "";
    if(card){
      showCard = card.name + ' (' + card.bank_name + ')';
    }
    return showCard;
  }
  inject('showCorporateCard', showCorporateCard)

  // Check permission
  const checkPermision = (webCode, onlyExecute = false) => {
    let hasCode = false;
    let canExecute = true;
    let canView = true;
    let codes = JSON.parse(localStorage.getItem("codes"));
    if (codes) {
      _.each(codes, (code) => {
        if (code.code == webCode) {
          hasCode = true;
          //console.log('permission', code.permission)
          switch (code.permission) {
            case 1:
              if(onlyExecute){
                canView = false;
              }
              canExecute = false;
              break;
            case 2:
              canExecute = true;
              break;
            default:
              canView = false;
              break;
          }
        }
      });
      if (!hasCode) {
        canView = false;
      }
    } else {
      canView = false;
    }
    return {
      canExecute, canView
    }
  }
  inject('checkPermision', checkPermision)

  // Generate pagination number
  const generateNo = (pagination, index) => {
    return pagination.total - (index + (pagination.current_page - 1) * pagination.per_page)
  }
  inject('generateNo', generateNo)

  // Generate current Date
  let date = new Date()
  const currentYear = () => date.getFullYear();
  inject('currentYear', currentYear)

  const currentQuarterly = () => moment().quarter();
  inject('currentQuarterly', currentQuarterly)

  const currentMonth = () => date.getMonth() + 1;
  inject('currentMonth', currentMonth)

  const currentDay = () => date.getDate();
  inject('currentDay', currentDay)

  let monthN = date.getMonth() + 1;
  let tmpMonth = monthN < 10 ? '0' + monthN : monthN;
  let tmpDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const currentDate = () => date.getFullYear() + '-' + tmpMonth + '-' + tmpDate;
  inject('currentDate', currentDate)

  const currentDateExcel = () => date.getFullYear() + '_' + tmpMonth + '_' + tmpDate;
  inject('currentDateExcel', currentDateExcel)

  // Generate month name from number
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  const monthName = (number) => month[number - 1]
  inject('monthName', monthName)

  // Generate quarter name from number
  var quarter = new Array();
  quarter[1] = "Quarter I";
  quarter[2] = "Quarter II";
  quarter[3] = "Quarter III";
  quarter[4] = "Quarter IV";
  const quarterName = (number) => quarter[number]
  inject('quarterName', quarterName)

  // Get value from array object
  const getOptionValue = (key, options, field = null, value = null) => {
    let res = {}
    if (field) {
      res = options.find(item => item[field] == key)
      return res ? res[value] : null
    } else {
      res = options.find(item => item.key == key)
      return res ? res.value : null
    }
  }
  inject('getOptionValue', getOptionValue)

  // Copy object
  const copyObject = (object, keys = []) => {
    let copyObject = {}
    if (keys.length > 0) {
      keys.forEach(key => {
        copyObject[key] = object[key]
      })
    } else {
      copyObject = JSON.parse(JSON.stringify(object))
    }
    return copyObject
  }
  inject('copyObject', copyObject)

  // Empty some properties in object
  const emptyProps = (object, keys = []) => {
    if (keys.length > 0) {
      keys.forEach(key => {
        object[key] = null
      })
    }
    return object
  }
  inject('emptyProps', emptyProps)

  const formatCurrency = (number, realCurr = 'VND', rates) => {
    if(number === null){
      return '';
    }else{
      if (!rates) {
        rates = {
          'VND': 23178,
          'USD': 1,
          'KRW': 1134
        }
      }
      let filter = {
        name: store.state.currentCurrency,
        unit: store.state.currentUnit
      }

      let eur = number / rates[realCurr]
      let current = eur * rates[filter.name] / filter.unit

      if (filter.name == 'VND' || filter.name == 'KRW') {
        current = Math.round(current)
      }

      //return new Intl.NumberFormat('vi-VN', { style: "currency", currency: filter.name }).format(current)
      return new Intl.NumberFormat('en-US', { style: "decimal", maximumFractionDigits: 2 }).format(current)
    }
  }
  inject('formatCurrency', formatCurrency)

  const approveStatus = [
    { id: null, name: "", class: '' },
    { id: -1, name: "All" },
    { id: 0, name: "Draft", class: '' },
    { id: 1, name: "Progress", class: 'sale_progress' },
    { id: 2, name: "Approve", class: 'sale_approve' },
    { id: 3, name: "Need Update", class: 'sale_needupdate' },
    { id: 4, name: "Reject", class: 'sale_reject' }
  ]
  const showApproveStatus = (statusId) => {
    return approveStatus.find(item => item.id == statusId).name
  }
  inject('showApproveStatus', showApproveStatus)

  const approveStatusClass = (statusId) => {
    return approveStatus.find(item => item.id == statusId).class
  }
  inject('approveStatusClass', approveStatusClass)

  const accountTypeName = (id) => {
    let types = {
      1: 'Basic Expense',
      2: 'Sales Expense'
    }
    return types[id]
  }
  inject('accountTypeName', accountTypeName)

  const budgetTypeName = (id) => {
    let types = {
      1: 'Basic Expense',
      2: 'Sales Expense'
    }
    return types[id]
  }
  inject('budgetTypeName', budgetTypeName)

  const renderStatusMember = (sta) => {
    let status = "";
    switch (sta) {
      case 0: status = "Active"; break;
      case 1: status = "Lock"; break;
      case 2: status = "In-active"; break;
      case 3: status = "Resign"; break;
      default: status = "-"; break;
    }
    return status;
  }
  inject('renderStatusMember', renderStatusMember)

  const renderClassStatusMember = (sta) => {
    let class_sta = "";
    switch (sta) {
      case 0: class_sta = "sta_active"; break;
      case 1: class_sta = "sta_temporary_locked"; break;
      case 2: class_sta = "sta_inactive"; break;
      case 3: class_sta = "sta_resigned"; break;
      default: class_sta = ""; break;
    }
    return class_sta;
  }
  inject('renderClassStatusMember', renderClassStatusMember)

  const renderStatusCate = (sta) => {
    let status = "";
    switch (sta) {
      case 1: status = "Active"; break;
      case 0: status = "Inactive"; break;
      default: status = "-"; break;
    }
    return status;
  }
  inject('renderStatusCate', renderStatusCate)

  const renderClassStatusCate = (sta) => {
    let class_sta = "";
    switch (sta) {
      case 1: class_sta = "sta_active"; break;
      case 0: class_sta = "sta_inactive"; break;
      default: class_sta = ""; break;
    }
    return class_sta;
  }
  inject('renderClassStatusCate', renderClassStatusCate)

  const renderCalculationStandard = (sta) => {
    let status = "";
    switch (sta) {
      case 1: status = "Manpower"; break;
      case 2: status = "Duty"; break;
      case 3: status = "Department"; break;
      case 4: status = "Fix"; break;
      default: status = "-"; break;
    }
    return status;
  }
  inject('renderCalculationStandard', renderCalculationStandard)

  const renderBalanceTransfer = (sta) => {
    let status = "";
    switch (sta) {
      case 0: status = "No"; break;
      case 1: status = "Yes"; break;
      default: status = "-"; break;
    }
    return status;
  }
  inject('renderBalanceTransfer', renderBalanceTransfer)

  const renderClassBalanceTransfer = (sta) => {
    let class_sta = "";
    switch (sta) {
      case 1: class_sta = "sta_active"; break;
      case 0: class_sta = "sta_inactive"; break;
      default: class_sta = ""; break;
    }
    return class_sta;
  }
  inject('renderClassBalanceTransfer', renderClassBalanceTransfer)

  const renderBudgetAccountStatus = (sta) => {
    let status = "";
    switch (sta) {
      case 0: status = "Inactive"; break;
      case 1: status = "Active"; break;
      default: status = "-"; break;
    }
    return status;
  }
  inject('renderBudgetAccountStatus', renderBudgetAccountStatus)

  const renderClassBudgetAccountStatus = (sta) => {
    let class_sta = "";
    switch (sta) {
      case 1: class_sta = "sta_active"; break;
      case 0: class_sta = "sta_inactive"; break;
      default: class_sta = ""; break;
    }
    return class_sta;
  }
  inject('renderClassBudgetAccountStatus', renderClassBudgetAccountStatus)

  const renderBudgetTransfer = (sta) => {
    let status = "";
    switch (sta) {
      case 0: status = "No"; break;
      case 1: status = "Yes"; break;
      default: status = "-"; break;
    }
    return status;
  }
  inject('renderBudgetTransfer', renderBudgetTransfer)

  const renderClassBudgetTransfer = (sta) => {
    let class_sta = "";
    switch (sta) {
      case 1: class_sta = "sta_active"; break;
      case 0: class_sta = "sta_inactive"; break;
      default: class_sta = ""; break;
    }
    return class_sta;
  }
  inject('renderClassBudgetTransfer', renderClassBudgetTransfer)

  const renderSalesActivity = (sta) => {
    let status = "";
    switch (sta) {
      case 0: status = "No"; break;
      case 1: status = "Yes"; break;
      default: status = "-"; break;
    }
    return status;
  }
  inject('renderSalesActivity', renderSalesActivity)

  const renderClassSalesActivity = (sta) => {
    let class_sta = "";
    switch (sta) {
      case 1: class_sta = "sta_active"; break;
      case 0: class_sta = "sta_inactive"; break;
      default: class_sta = ""; break;
    }
    return class_sta;
  }
  inject('renderClassSalesActivity', renderClassSalesActivity)

  const renderStatusAuthority = (sta) => {
    let status = "";
    switch (sta) {
      case 0: status = "Inactive"; break;
      case 1: status = "Active"; break;
      default: status = "-"; break;
    }
    return status;
  }
  inject('renderStatusAuthority', renderStatusAuthority)

  const renderClassAuthority = (sta) => {
    let class_sta = "";
    switch (sta) {
      case 1: class_sta = "sta_active"; break;
      case 0: class_sta = "sta_inactive"; break;
      default: class_sta = ""; break;
    }
    return class_sta;
  }
  inject('renderClassAuthority', renderClassAuthority)

  const renderStatusPlanSale = (sta) => {
    let status = "";
    switch (sta) {
      case 0: status = "Draft"; break;
      case 1: status = "Progress"; break;
      case 2: status = "Approve"; break;
      case 3: status = "Need update"; break;
      case 4: status = "Reject"; break;
      default: status = "-"; break;
    }
    return status;
  }
  inject('renderStatusPlanSale', renderStatusPlanSale)

  const renderClassPlanSale = (sta) => {
    let class_sta = "";
    switch (sta) {
      case 0: class_sta = "sale_draft"; break;
      case 1: class_sta = "sale_progress"; break;
      case 2: class_sta = "sale_approve"; break;
      case 3: class_sta = "sale_needupdate"; break;
      case 4: class_sta = "sale_reject"; break;
      default: class_sta = ""; break;
    }
    return class_sta;
  }
  inject('renderClassPlanSale', renderClassPlanSale)

  const renderStatusPlanActual = (sta) => {
    let status = "";
    switch (sta) {
      case 0: status = "Draft"; break;
      case 1: status = "Progress"; break;
      case 2: status = "Approve"; break;
      case 3: status = "Need update"; break;
      case 4: status = "Reject"; break;
      default: status = "-"; break;
    }
    return status;
  }
  inject('renderStatusPlanActual', renderStatusPlanActual)

  const renderClassPlanActual = (sta) => {
    let class_sta = "";
    switch (sta) {
      case 0: class_sta = "sale_draft"; break;
      case 1: class_sta = "sale_progress"; break;
      case 2: class_sta = "sale_approve"; break;
      case 3: class_sta = "sale_needupdate"; break;
      case 4: class_sta = "sale_reject"; break;
      default: class_sta = ""; break;
    }
    return class_sta;
  }
  inject('renderClassPlanActual', renderClassPlanActual)

  const renderStatusManpower = (sta) => {
    let status = "";
    switch (sta) {
      case 0: status = "Draft"; break;
      case 1: status = "Progress"; break;
      case 2: status = "Approve"; break;
      case 3: status = "Need update"; break;
      case 4: status = "Reject"; break;
      default: status = "-"; break;
    }
    return status;
  }
  inject('renderStatusManpower', renderStatusManpower)

  const renderClassManpower = (sta) => {
    let class_sta = "";
    switch (sta) {
      case 0: class_sta = "manpower_draft"; break;
      case 1: class_sta = "manpower_progress"; break;
      case 2: class_sta = "manpower_approve"; break;
      case 3: class_sta = "manpower_needupdate"; break;
      case 4: class_sta = "manpower_reject"; break;
      default: class_sta = ""; break;
    }
    return class_sta;
  }
  inject('renderClassManpower', renderClassManpower)

  const renderStatusAnnualBudget = (sta) => {
    let status = "";
    switch (sta) {
      case 0: status = "Draft"; break;
      case 1: status = "Progress"; break;
      case 2: status = "Approve"; break;
      case 3: status = "Need update"; break;
      case 4: status = "Reject"; break;
      default: status = "-"; break;
    }
    return status;
  }
  inject('renderStatusAnnualBudget', renderStatusAnnualBudget)

  const renderClassAnnualBudget = (sta) => {
    let class_sta = "";
    switch (sta) {
      case 0: class_sta = "annualbudget_draft"; break;
      case 1: class_sta = "annualbudget_progress"; break;
      case 2: class_sta = "annualbudget_approve"; break;
      case 3: class_sta = "annualbudget_needupdate"; break;
      case 4: class_sta = "annualbudget_reject"; break;
      default: class_sta = ""; break;
    }
    return class_sta;
  }
  inject('renderClassAnnualBudget', renderClassAnnualBudget)

  const canStatus = (status_id) => {
    //0 = Draft, 1 = Progress, 2 = Approve, 3 = Need Update, 4 = Reject
    let canRequest = [0, 3, 4].indexOf(status_id) >= 0 ? true : false
    let canCancelRequest = [1].indexOf(status_id) >= 0 ? true : false
    let canApprove = [1].indexOf(status_id) >= 0 ? true : false
    let canCancelApprove = [2].indexOf(status_id) >= 0 ? true : false
    let canReject = [1].indexOf(status_id) >= 0 ? true : false
    let canDelete = [0, 3].indexOf(status_id) >= 0 ? true : false
    let canEdit = [0, 3, 4].indexOf(status_id) >= 0 ? true : false
    return {
      request: canRequest,
      cancelRequest: canCancelRequest,
      approve: canApprove,
      cancelApprove: canCancelApprove,
      reject: canReject,
      delete: canDelete,
      edit: canEdit
    }
  }
  inject('canStatus', canStatus)
}
