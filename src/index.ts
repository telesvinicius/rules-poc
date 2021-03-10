import RuleService from "./Rules";
import { CartInterface, PromotionInterface } from "./Interfaces";
import Enuns from "./Enuns/PromotionEnum";
import promotions from "./promotions.json";
const ruleService = new RuleService();

//escolhe a melhor promoção para o determinado carrinho example
const applyRules = (cart: CartInterface) => {
  const carts: CartInterface[] = [];
  ruleService.getRules().map(({ rule }) => carts.push(rule(cart)));
  return carts.sort((first, next) => first.total - next.total)[0];
};

// carrega as regras apartir de determinado parametros que seguem a interface
const loadRules = (promotions: PromotionInterface[]) => {
  promotions.map((promotion) =>
    ruleService.setRules(
      promotion.priority,
      Enuns[promotion.type],
      promotion.params
    )
  );
};

//remover caso use como package
loadRules(promotions);

export default applyRules;

export { applyRules, loadRules };
