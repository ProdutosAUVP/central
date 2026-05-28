import React from "react";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const rows = [
  ["Value 1.1", "Value 1.2", "Value 1.3"],
  ["Value 2.1", "Value 2.2", "Value 2.3"],
  ["Value 3.1", "Value 3.2", "Value 3.3"],
];

export function TabelaWidget() {
  return (
    <ComponentShowcase
      title="Tabela"
      description="Tabela minimalista inspirada no Geist: cabeçalho discreto, linhas alternadas (zebra) e alinhamento da última coluna à direita. Útil para listagens de dados tabulares enxutos."
      code={`import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

<div className="rounded-xl border bg-card overflow-hidden">
  <Table>
    <TableHeader>
      <TableRow className="hover:bg-transparent border-b">
        <TableHead className="text-xs font-roboto uppercase tracking-wider">Col 1</TableHead>
        <TableHead className="text-xs font-roboto uppercase tracking-wider">Col 2</TableHead>
        <TableHead className="text-xs font-roboto uppercase tracking-wider text-right">Col 3</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map((row, i) => (
        <TableRow key={i} className={cn("border-0 hover:bg-muted/40", i % 2 === 0 && "bg-muted/30")}>
          <TableCell className="font-roboto text-sm">{row[0]}</TableCell>
          <TableCell className="font-roboto text-sm">{row[1]}</TableCell>
          <TableCell className="font-roboto text-sm text-right">{row[2]}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>`}
      htmlCode={`<style>
  .geist-table-wrap { border:1px solid hsl(var(--border, 120 10% 88%)); border-radius:12px; background:hsl(var(--card, 0 0% 100%)); overflow:hidden; }
  .geist-table { width:100%; border-collapse:collapse; font-family:'Roboto', sans-serif; font-size:14px; }
  .geist-table thead th {
    text-align:left; padding:14px 20px;
    font-size:12px; font-weight:500; text-transform:uppercase; letter-spacing:.05em;
    color:hsl(var(--muted-foreground, 110 10% 40%));
    border-bottom:1px solid hsl(var(--border, 120 10% 88%));
  }
  .geist-table tbody td { padding:14px 20px; color:hsl(var(--foreground, 110 78% 9%)); }
  .geist-table tbody tr:nth-child(odd) td { background:hsl(var(--muted, 120 10% 96%) / .5); }
  .geist-table th:last-child, .geist-table td:last-child { text-align:right; }
</style>

<div class="geist-table-wrap">
  <table class="geist-table">
    <thead>
      <tr><th>Col 1</th><th>Col 2</th><th>Col 3</th></tr>
    </thead>
    <tbody>
      <tr><td>Value 1.1</td><td>Value 1.2</td><td>Value 1.3</td></tr>
      <tr><td>Value 2.1</td><td>Value 2.2</td><td>Value 2.3</td></tr>
      <tr><td>Value 3.1</td><td>Value 3.2</td><td>Value 3.3</td></tr>
    </tbody>
  </table>
</div>`}
    >
      <div className="w-full rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="text-xs font-roboto uppercase tracking-wider font-medium">Col 1</TableHead>
              <TableHead className="text-xs font-roboto uppercase tracking-wider font-medium">Col 2</TableHead>
              <TableHead className="text-xs font-roboto uppercase tracking-wider font-medium text-right">Col 3</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={i}
                className={cn("border-0 hover:bg-muted/40", i % 2 === 0 && "bg-muted/30")}
              >
                <TableCell className="font-roboto text-sm">{row[0]}</TableCell>
                <TableCell className="font-roboto text-sm">{row[1]}</TableCell>
                <TableCell className="font-roboto text-sm text-right">{row[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ComponentShowcase>
  );
}

export function TabelaBorderedWidget() {
  return (
    <ComponentShowcase
      title="Tabela Bordered"
      description="Variação bordered: sem zebra, com divisor sutil entre todas as linhas. Indicada quando todas as linhas têm o mesmo peso visual e a leitura horizontal precisa de uma guia clara."
      code={`import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

<div className="rounded-xl border bg-card overflow-hidden">
  <Table>
    <TableHeader>
      <TableRow className="hover:bg-transparent border-b">
        <TableHead className="text-xs font-roboto uppercase tracking-wider">Col 1</TableHead>
        <TableHead className="text-xs font-roboto uppercase tracking-wider">Col 2</TableHead>
        <TableHead className="text-xs font-roboto uppercase tracking-wider text-right">Col 3</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map((row, i) => (
        <TableRow key={i} className="border-b last:border-0 hover:bg-muted/30">
          <TableCell className="font-roboto text-sm">{row[0]}</TableCell>
          <TableCell className="font-roboto text-sm">{row[1]}</TableCell>
          <TableCell className="font-roboto text-sm text-right">{row[2]}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>`}
      htmlCode={`<style>
  .geist-table-wrap { border:1px solid hsl(var(--border, 120 10% 88%)); border-radius:12px; background:hsl(var(--card, 0 0% 100%)); overflow:hidden; }
  .geist-table-b { width:100%; border-collapse:collapse; font-family:'Roboto', sans-serif; font-size:14px; }
  .geist-table-b thead th {
    text-align:left; padding:14px 20px;
    font-size:12px; font-weight:500; text-transform:uppercase; letter-spacing:.05em;
    color:hsl(var(--muted-foreground, 110 10% 40%));
    border-bottom:1px solid hsl(var(--border, 120 10% 88%));
  }
  .geist-table-b tbody td { padding:14px 20px; color:hsl(var(--foreground, 110 78% 9%)); border-bottom:1px solid hsl(var(--border, 120 10% 88%)); }
  .geist-table-b tbody tr:last-child td { border-bottom:none; }
  .geist-table-b th:last-child, .geist-table-b td:last-child { text-align:right; }
</style>

<div class="geist-table-wrap">
  <table class="geist-table-b">
    <thead>
      <tr><th>Col 1</th><th>Col 2</th><th>Col 3</th></tr>
    </thead>
    <tbody>
      <tr><td>Value 1.1</td><td>Value 1.2</td><td>Value 1.3</td></tr>
      <tr><td>Value 2.1</td><td>Value 2.2</td><td>Value 2.3</td></tr>
      <tr><td>Value 3.1</td><td>Value 3.2</td><td>Value 3.3</td></tr>
    </tbody>
  </table>
</div>`}
    >
      <div className="w-full rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="text-xs font-roboto uppercase tracking-wider font-medium">Col 1</TableHead>
              <TableHead className="text-xs font-roboto uppercase tracking-wider font-medium">Col 2</TableHead>
              <TableHead className="text-xs font-roboto uppercase tracking-wider font-medium text-right">Col 3</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i} className="border-b last:border-0 hover:bg-muted/30">
                <TableCell className="font-roboto text-sm">{row[0]}</TableCell>
                <TableCell className="font-roboto text-sm">{row[1]}</TableCell>
                <TableCell className="font-roboto text-sm text-right">{row[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ComponentShowcase>
  );
}

