export default function FundCard() {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold">Fund Information</h2>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">NAV</p>
          <p className="font-semibold">₹100.00</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">1Y Return</p>
          <p className="font-semibold text-green-600">+15.2%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Expense Ratio</p>
          <p className="font-semibold">1.5%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">AUM</p>
          <p className="font-semibold">₹10,000 Cr</p>
        </div>
      </div>
    </div>
  );
}
