const formatMoneyAmount = (amount) =>
  amount == null ? '' : new Intl.NumberFormat().format(amount);

export default formatMoneyAmount;
