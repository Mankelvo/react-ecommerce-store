function CartItem({item}){
const price = Number(item.price ?? 0);
const quantity = Number(item.quantity ?? 1);
const totalPrice = price * quantity;

    return (
        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-5" >
<div className="flex flex-col gap-5 sm:flex-row">
<div className="flex h-44 w-full shrink-0 items-center justify-center rounded-2xl bg-slate-100 p-5 sm:h-36  sm:w-36">
<img
className="h-full w-full object-contain"
src={item.image}
alt={item.title ?? "Cart Item"}
/>
</div>

<div className="flex flex-1 flex-col justify-between">
<h3 className="text-lg font-bold leading-snug text-slate-900">{item.title}</h3>
<p className="mt-2 text-sm text-slate-500">Unit Price:{" "}
<span className="font-semibold text-slate-800">${price.toFixed(2)}</span>
</p>
</div>

<div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-betweeny">
    <div className="inline-flex w-fit items-center rounded-full bg-slate-100 px-4 py-2">
        <span className="text-sm text-slate-500">Qty:</span>
        <span className="ml-2 font-bold text-slate-900">{quantity}</span>
    </div>

    <div className="text-left sm:text-right">
        <p className="text-sm text-slate-500">Item Total</p>
        <p className="text-xl font-bold text-slate-900">${totalPrice.toFixed(2)}</p>
    </div>

</div>
</div>
        </article>

       
    )
}

export default CartItem;