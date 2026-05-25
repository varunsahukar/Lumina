export default function FilterPanel() {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h3 className="font-semibold">Filters</h3>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Category</p>
        <p className="text-sm text-muted-foreground">AMC</p>
        <p className="text-sm text-muted-foreground">Return Range</p>
      </div>
    </div>
  );
}
