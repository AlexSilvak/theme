"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch"
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

export default function Profile() {

  const [themeColor, setThemeColor] = useState("zinc");
  const [themeMode, setThemeMode] = useState("light");
  


   useEffect(() => {
    // Verificar se o código está rodando no cliente
    if (typeof window !== "undefined") {
      // Tenta pegar as preferências do localStorage
      const savedColor = localStorage.getItem("themeColor");
      const savedMode = localStorage.getItem("themeMode");

      // Verifique se a cor salva está entre as cores válidas
      if (savedColor && themeColors.includes(savedColor as ThemeColor)) {
        setThemeColor(savedColor as ThemeColor);
      }

      // Verifique se o modo salvo está entre os modos válidos
      if (savedMode === "light" || savedMode === "dark") {
        setThemeMode(savedMode as ThemeMode);
      }
    }
  }, []); // Só roda no cliente após a renderização


    useEffect(() => {
    // Atualiza a classe 'data-theme' no documento para refletir o modo atual
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", themeMode);

      // Salva no localStorage sempre que o tema ou a cor for alterado
      localStorage.setItem("themeMode", themeMode);
      localStorage.setItem("themeColor", themeColor);
    }
  }, [themeMode, themeColor]);

  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);


  
  return (
    <div className={`min-h-screen p-6 bg-${themeColor}-100 dark:bg-gray-900`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Personalizador de temas</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Personalize as cores do seu perfil.
        </p>

        <Tabs defaultValue="colors" className="mb-6">
          <TabsList>
            <TabsTrigger value="colors">Cores</TabsTrigger>
            <TabsTrigger value="mode">Modo</TabsTrigger>
          </TabsList>

          <TabsContent value="colors">
            <div className="grid grid-cols-4 gap-4">
              {["zinc", "red", "pink", "orange", "green", "blue", "yellow", "violet"].map(color => (
                <Button key={color} className={`bg-${color}-500 text-white`} onClick={() => setThemeColor(color)}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mode">
            <div className="flex gap-4">
              
          
                  <span className="">
        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    </span>
                 <Switch 
                checked={themeMode === "dark"} // Define o estado do Switch com base no modo atual
                onCheckedChange={() => setThemeMode(themeMode === "light" ? "dark" : "light")} // Alterna entre light e dark
              />      
  <span className="">
        <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
    </span>
             

            </div>
          </TabsContent>
         

        </Tabs>

        <Card>
          <CardContent>
            <Label>Nome</Label>
            <Input placeholder="Digite seu nome" className={`border-${themeColor}-500`} />
            <Label className="mt-4">E-mail</Label>
            <Input type="email" placeholder="Digite seu e-mail" className={`border-${themeColor}-500`} />
            <Button className={`mt-4 bg-${themeColor}-500 text-white`}>Salvar</Button>
          </CardContent>
  

        </Card>
  
        
      </div>
    </div>
  );
}
