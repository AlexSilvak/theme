"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch"


export default function Profile() {

  const [themeColor, setThemeColor] = useState("zinc");
  const [themeMode, setThemeMode] = useState("light");

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
          Personalize as cores dos seus componentes.
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
              <Button onClick={() => setThemeMode("light")} className="bg-gray-200 text-black">Modo Claro</Button>
              <Button onClick={() => setThemeMode("dark")} className="bg-black text-white">Modo Escuro</Button>
            </div>
          </TabsContent>
          <Switch />
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
