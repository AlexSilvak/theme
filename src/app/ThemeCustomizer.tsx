import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import clsx from "clsx";

// Definindo as cores do tema
const themeColors = ["zinc", "red", "pink", "orange", "green", "blue", "yellow", "violet"] as const;
type ThemeColor = (typeof themeColors)[number];
type ThemeMode = "light" | "dark";

// Definindo as classes de estilo para as cores
const colorClasses: Record<ThemeColor, string> = {
  zinc: "bg-zinc-500 hover:bg-zinc-600 border-zinc-500",
  red: "bg-red-500 hover:bg-red-600 border-red-500",
  pink: "bg-pink-500 hover:bg-pink-600 border-pink-500",
  orange: "bg-orange-500 hover:bg-orange-600 border-orange-500",
  green: "bg-green-500 hover:bg-green-600 border-green-500",
  blue: "bg-blue-500 hover:bg-blue-600 border-blue-500",
  yellow: "bg-yellow-500 hover:bg-yellow-600 border-yellow-500",
  violet: "bg-violet-500 hover:bg-violet-600 border-violet-500",
};

export default function ThemeCustomizer() {
  // Lendo o tema e a cor do localStorage ou usando valores padrão
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    const savedColor = localStorage.getItem("themeColor");
    return (savedColor as ThemeColor) || "zinc"; // valor padrão "zinc"
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem("themeMode");
    return (savedMode as ThemeMode) || "light"; // valor padrão "light"
  });

  useEffect(() => {
    // Atualiza a classe 'data-theme' no documento para refletir o modo atual
    document.documentElement.setAttribute("data-theme", themeMode);

    // Salva no localStorage sempre que o tema ou a cor for alterado
    localStorage.setItem("themeMode", themeMode);
    localStorage.setItem("themeColor", themeColor);
  }, [themeMode, themeColor]);

  return (
    <div className={clsx("min-h-screen p-6", themeMode === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-900")}> 
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Personalizador de temas</h1>
        <p className="mb-6">Personalize as cores dos seus componentes.</p>
        
        <Tabs defaultValue="colors" className="mb-6">
          <TabsList>
            <TabsTrigger value="colors">Cores</TabsTrigger>
            <TabsTrigger value="mode">Modo</TabsTrigger>
          </TabsList>

          <TabsContent value="colors">
            <div className="grid grid-cols-4 gap-4">
              {themeColors.map(color => (
                <Button 
                  key={color} 
                  className={clsx("text-white", colorClasses[color])} 
                  onClick={() => setThemeColor(color)}
                >
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mode">
            <div className="flex gap-4">
              <Button onClick={() => setThemeMode("light")} className="bg-gray-200 text-black">Modo Claro</Button>
              <Button onClick={() => setThemeMode("dark")} className="bg-black text-white">Modo Escuro</Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <Card className="mt-6">
          <CardContent >
            <Label>Nome</Label>
            <Input placeholder="Digite seu nome" className={clsx(colorClasses[themeColor])} />
            <Label className="mt-4">E-mail</Label>
            <Input type="email" placeholder="Digite seu e-mail" className={clsx(colorClasses[themeColor])} />
            <Button className={clsx("mt-4 text-white", colorClasses[themeColor])}>Salvar</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
