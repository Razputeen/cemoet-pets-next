'use client';

export default function ProductListPage() {
  const handlePay = async () => {
    const res = await fetch("http://localhost:3222/payments/create",)
    const data = await res.json();
    window.location.href = data.redirect_url
  }
  return (
    <div>
      <button onClick={handlePay}>Pay</button>
    </div>
  );
}