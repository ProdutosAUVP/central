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
      description="Tabela minimalista inspirada no Geist: cabeçalho discreto, linhas alternadas (zebra) e alinhamento da última coluna à direita."
      code={`<div className="rounded-xl border bg-card overflow-hidden">
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
      htmlCode={`<div class="geist-table-wrap"><table class="geist-table">...</table></div>`}
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
      description="Variação bordered: sem zebra, com divisor sutil entre todas as linhas."
      code={`<Table>
  <TableBody>
    {rows.map((row, i) => (
      <TableRow key={i} className="border-b last:border-0 hover:bg-muted/30">
        ...
      </TableRow>
    ))}
  </TableBody>
</Table>`}
      htmlCode={`<table class="geist-table-b">...</table>`}
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
