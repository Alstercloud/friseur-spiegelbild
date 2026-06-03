import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function AdminTeam() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team verwalten</h1>
          <p className="text-muted-foreground">
            Mitarbeiter hinzufügen, bearbeiten und verwalten
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <CardTitle>Team-Verwaltung</CardTitle>
            </div>
            <CardDescription>
              Hier können Sie Team-Mitglieder bearbeiten
            </CardDescription>
          </CardHeader>
          <CardContent className="py-12 text-center text-muted-foreground">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p>Team-Verwaltung wird in Kürze verfügbar sein</p>
            <p className="text-sm mt-2">Team-Daten sind bereits in Supabase</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
