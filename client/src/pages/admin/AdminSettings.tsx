import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Einstellungen</h1>
          <p className="text-muted-foreground">
            Systemeinstellungen und Konfiguration
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              <CardTitle>Einstellungen</CardTitle>
            </div>
            <CardDescription>
              Konfigurieren Sie das Admin Panel
            </CardDescription>
          </CardHeader>
          <CardContent className="py-12 text-center text-muted-foreground">
            <Settings className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p>Einstellungen werden in Kürze verfügbar sein</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
