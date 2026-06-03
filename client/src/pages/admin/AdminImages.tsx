import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Images } from 'lucide-react';

export default function AdminImages() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bilder verwalten</h1>
          <p className="text-muted-foreground">
            Upload und Verwaltung von Bildern in Supabase Storage
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Images className="w-5 h-5 text-primary" />
              <CardTitle>Bild-Verwaltung</CardTitle>
            </div>
            <CardDescription>
              Hier können Sie Bilder hochladen und verwalten
            </CardDescription>
          </CardHeader>
          <CardContent className="py-12 text-center text-muted-foreground">
            <Images className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p>Bildverwaltung wird in Kürze verfügbar sein</p>
            <p className="text-sm mt-2">Aktuell 23 Bilder in Supabase Storage</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
