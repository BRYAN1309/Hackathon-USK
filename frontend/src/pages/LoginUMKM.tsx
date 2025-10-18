import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import logo from "@/assets/logo.svg";
import { loginUser } from "@/api/auth";
import { useToast } from "@/hooks/use-toast";
import umkmBg from "@/assets/umkm-3.jpg";

const LoginUMKM = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(email, password);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast({
        title: "Login berhasil!",
        description: "Anda akan diarahkan ke dashboard UMKM.",
      });
      navigate("/dashboard-umkm");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Gagal",
        description:
          error.response?.data?.message ||
          "Periksa kembali email & password Anda.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${umkmBg})` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      <Card className="w-full max-w-md shadow-lg z-10">
        <CardHeader className="space-y-4 text-center">
          <div className="relative w-full">
            <img
              src={logo}
              alt="TemanUsaha"
              className="block mx-auto w-48 h-auto md:w-56 drop-shadow-md transition-transform duration-300 hover:scale-105"
              style={{ position: "relative", left: "30px" }}
            />
          </div>
          <CardTitle className="text-2xl font-bold">Login UMKM</CardTitle>
          <CardDescription>Masuk ke akun UMKM Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Masuk"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <Link
                to="/register-umkm"
                className="text-primary font-medium hover:underline"
              >
                Daftar sekarang
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginUMKM;