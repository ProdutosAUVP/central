import React, { useState } from "react";
import { BrandToggle } from "@/components/design-system/BrandToggle";

import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { SectionThemeToggle } from "@/components/design-system/SectionThemeToggle";
import { GradeCurricular } from "@/components/widgets/GradeCurricular";
import { TabelaPrecos } from "@/components/widgets/TabelaPrecos";
import { JornadaHeroi } from "@/components/widgets/JornadaHeroi";
import { AIFood } from "@/components/widgets/AIFood";
import { MarcaLogos } from "@/components/widgets/MarcaLogos";
import { GlobalNav } from "@/components/GlobalNav";
import { Icones } from "@/components/widgets/Icones";
import { PaletaDataViz } from "@/components/widgets/PaletaDataViz";
import { GraficoPizza } from "@/components/widgets/GraficoPizza";
import { GraficoPizzaLegendas } from "@/components/widgets/GraficoPizzaLegendas";
import { Introducao } from "@/components/widgets/Introducao";
import { LayoutEspacamento } from "@/components/widgets/LayoutEspacamento";
import { ContagemRegressiva } from "@/components/widgets/ContagemRegressiva";
import { TooltipsPopups } from "@/components/widgets/TooltipsPopups";
import { FaqDuvidas } from "@/components/widgets/FaqDuvidas";
import { WidgetsFlutuantes } from "@/components/widgets/WidgetsFlutuantes";

import { Calculadora } from "@/components/widgets/Calculadora";
import { CalculadoraRendimentos } from "@/components/widgets/CalculadoraRendimentos";
import { CardsContainers } from "@/components/widgets/CardsContainers";
import { PlataformaCursos } from "@/components/widgets/PlataformaCursos";
import { PlataformaPlayer } from "@/components/widgets/PlataformaPlayer";
import { PlataformaPlaylist } from "@/components/widgets/PlataformaPlaylist";
import { PlataformaDashboard } from "@/components/widgets/PlataformaDashboard";
import { PlataformaNotas } from "@/components/widgets/PlataformaNotas";
import { PlataformaRating } from "@/components/widgets/PlataformaRating";
import { PlataformaComunidade } from "@/components/widgets/PlataformaComunidade";
import { PlataformaCertificados } from "@/components/widgets/PlataformaCertificados";
import { LivroDefault, LivroVariants, LivroCustomColor, LivroResponsivo } from "@/components/widgets/Livro";
import livroBaseHtml from "@/components/widgets/html-snippets/livro-base.html?raw";
import livroDefaultHtml from "@/components/widgets/html-snippets/livro-default.html?raw";
import livroVariantsHtml from "@/components/widgets/html-snippets/livro-variants.html?raw";
import livroCustomHtml from "@/components/widgets/html-snippets/livro-custom.html?raw";
import livroResponsivoHtml from "@/components/widgets/html-snippets/livro-responsivo.html?raw";
import { CheckboxDefault, CheckboxDisabled } from "@/components/widgets/CheckboxGeist";
import checkboxHtml from "@/components/widgets/html-snippets/checkbox.html?raw";
import { ChoiceboxRadio, ChoiceboxCheckbox, ChoiceboxDisabled } from "@/components/widgets/ChoiceboxGeist";
import choiceboxHtml from "@/components/widgets/html-snippets/choicebox.html?raw";
import platCursosSrc from "@/components/widgets/PlataformaCursos?raw";
import platPlayerSrc from "@/components/widgets/PlataformaPlayer?raw";
import platPlaylistSrc from "@/components/widgets/PlataformaPlaylist?raw";
import platDashboardSrc from "@/components/widgets/PlataformaDashboard?raw";
import platNotasSrc from "@/components/widgets/PlataformaNotas?raw";
import platRatingSrc from "@/components/widgets/PlataformaRating?raw";
import platComunidadeSrc from "@/components/widgets/PlataformaComunidade?raw";
import platCertificadosSrc from "@/components/widgets/PlataformaCertificados?raw";
import platCursosHtml from "@/components/widgets/html-snippets/plataforma-cursos.html?raw";
import platPlayerHtml from "@/components/widgets/html-snippets/plataforma-player.html?raw";
import platPlaylistHtml from "@/components/widgets/html-snippets/plataforma-playlist.html?raw";
import platDashboardHtml from "@/components/widgets/html-snippets/plataforma-dashboard.html?raw";
import platNotasHtml from "@/components/widgets/html-snippets/plataforma-notas.html?raw";
import platRatingHtml from "@/components/widgets/html-snippets/plataforma-rating.html?raw";
import platComunidadeHtml from "@/components/widgets/html-snippets/plataforma-comunidade.html?raw";
import platCertificadosHtml from "@/components/widgets/html-snippets/plataforma-certificados.html?raw";
import tabelaPrecosSrc from "@/components/widgets/TabelaPrecos?raw";
import jornadaHeroiSrc from "@/components/widgets/JornadaHeroi?raw";
import marcaLogosSrc from "@/components/widgets/MarcaLogos?raw";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useBrand } from "@/contexts/BrandContext";
import { olhoBranco, olhoPreto } from "@/assets/olhos";

import {
  Palette, Type, Square, MousePointer,
  AlertCircle, Info, ArrowRight, GraduationCap, DollarSign, Map, Bot,
  Download, Shapes, BookOpen, Video, ListOrdered, BarChart3, PenLine, Star, MessageCircle,
  Layout, Calculator, Clock, HelpCircle, Award, MessageSquare, Package, Menu, PieChart as PieChartIcon,
  Bell, ShieldAlert, Loader2, Layers, PanelRightOpen,
  ArrowLeftRight, FolderTree, UploadCloud, Star as StarIcon, ListFilter, Search,
  ListChecks, ToggleLeft, Anchor as AnchorIcon, AtSign, Columns3,
  Activity, GitCommit, ListTree, ClipboardList, Inbox as InboxIcon, CheckCircle2, Compass, Stamp,
  ChevronRight, CalendarIcon, SquareCheck, Table as TableIcon
} from "lucide-react";
import { Notifications } from "@/components/widgets/Notifications";
import { PopconfirmWidget } from "@/components/widgets/Popconfirm";
import { SpinTipWidget } from "@/components/widgets/SpinTip";
import { SkeletonAvancado } from "@/components/widgets/SkeletonAvancado";
import { DrawerMultiNivel, DrawerSimples } from "@/components/widgets/DrawerMultiNivel";
import { TransferWidget } from "@/components/widgets/Transfer";
import { TreeSelectWidget } from "@/components/widgets/TreeSelect";
import { UploadComPreview } from "@/components/widgets/UploadComPreview";
import { CalendarioWidget } from "@/components/widgets/Calendario";
import { RateWidget } from "@/components/widgets/Rate";
import { AutoCompleteWidget } from "@/components/widgets/AutoComplete";
import { StepsWidget } from "@/components/widgets/Steps";
import { SegmentedWidget, SwitchSimplesWidget, SwitchDisabledWidget } from "@/components/widgets/Segmented";
import { AnchorWidget } from "@/components/widgets/Anchor";
import { TabsGeistWidget } from "@/components/widgets/TabsGeist";
import { MentionsWidget } from "@/components/widgets/Mentions";
import { CascaderWidget } from "@/components/widgets/Cascader";
import { StatisticWidget } from "@/components/widgets/Statistic";
import { TimelineWidget } from "@/components/widgets/Timeline";
import { TreeWidget } from "@/components/widgets/Tree";
import { DescriptionsWidget } from "@/components/widgets/Descriptions";
import { TabelaWidget, TabelaBorderedWidget } from "@/components/widgets/Tabela";
import { ProgressGeistWidget } from "@/components/widgets/ProgressGeist";
import { EmptyWidget } from "@/components/widgets/Empty";
import { ResultWidget } from "@/components/widgets/Result";
import { TourWidget } from "@/components/widgets/Tour";
import { WatermarkWidget } from "@/components/widgets/Watermark";