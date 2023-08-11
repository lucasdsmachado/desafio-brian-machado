import { cardapio, extras } from "./cardapio";
class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        const formasDePagamento = ['debito', 'credito', 'dinheiro'];

        if (!formasDePagamento.includes(metodoDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let total = 0;
        let carrinho = {};

        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(',');

            if (!cardapio.hasOwnProperty(codigo)) {
                return 'Item inválido!';
            }

            if (parseInt(quantidade) === 0) {
                return "Quantidade inválida!";
            }

            if (extras[codigo] && !(extras[codigo] in carrinho)) {
                return "Item extra não pode ser pedido sem o principal";
            }

            total += cardapio[codigo].valor * parseInt(quantidade);
            carrinho[codigo] = quantidade
        }

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03;
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

}

export { CaixaDaLanchonete };