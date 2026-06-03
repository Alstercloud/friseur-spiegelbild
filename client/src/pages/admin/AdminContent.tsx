import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Save, Search, Edit, Layers } from 'lucide-react';
import type { ContentBlock } from '@/types/contentBlocks';

export default function AdminContent() {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [filteredBlocks, setFilteredBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);
  const [editForm, setEditForm] = useState<Partial<ContentBlock>>({});

  useEffect(() => {
    loadBlocks();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = blocks.filter(block => 
        block.section?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        block.block_key?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        block.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        block.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlocks(filtered);
    } else {
      setFilteredBlocks(blocks);
    }
  }, [searchTerm, blocks]);

  const loadBlocks = async () => {
    try {
      const { data, error } = await supabase
        .from('content_blocks')
        .select('*')
        .order('section', { ascending: true })
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setBlocks(data || []);
      setFilteredBlocks(data || []);
    } catch (error) {
      console.error('Error loading blocks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (block: ContentBlock) => {
    setEditingBlock(block);
    setEditForm(block);
  };

  const handleSave = async () => {
    if (!editingBlock || !editForm.id) return;
    
    setSaving(editForm.id);
    try {
      const { error } = await supabase
        .from('content_blocks')
        .update({
          title: editForm.title,
          subtitle: editForm.subtitle,
          content: editForm.content,
          badge_text: editForm.badge_text,
          cta_text: editForm.cta_text,
          cta_url: editForm.cta_url,
          image_alt: editForm.image_alt,
          is_active: editForm.is_active,
        })
        .eq('id', editForm.id);

      if (error) throw error;

      // Reload blocks
      await loadBlocks();
      setEditingBlock(null);
      setEditForm({});
    } catch (error) {
      console.error('Error saving block:', error);
      alert('Fehler beim Speichern!');
    } finally {
      setSaving(null);
    }
  };

  const handleCancel = () => {
    setEditingBlock(null);
    setEditForm({});
  };

  // Group blocks by section
  const groupedBlocks = filteredBlocks.reduce((acc, block) => {
    const section = block.section || 'Other';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(block);
    return acc;
  }, {} as Record<string, ContentBlock[]>);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inhalte verwalten</h1>
          <p className="text-muted-foreground">
            Bearbeite Texte, Bilder und CTAs für alle Sections
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Suche nach Section, Key, Titel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredBlocks.length} von {blocks.length} Blöcken
          </div>
        </div>

        {/* Edit Form */}
        {editingBlock && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Block bearbeiten</CardTitle>
              <CardDescription>
                {editingBlock.section} / {editingBlock.block_key}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titel</Label>
                  <Input
                    id="title"
                    value={editForm.title || ''}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Untertitel</Label>
                  <Input
                    id="subtitle"
                    value={editForm.subtitle || ''}
                    onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Inhalt</Label>
                <Textarea
                  id="content"
                  value={editForm.content || ''}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="badge_text">Badge Text</Label>
                  <Input
                    id="badge_text"
                    value={editForm.badge_text || ''}
                    onChange={(e) => setEditForm({ ...editForm, badge_text: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_alt">Bild Alt-Text</Label>
                  <Input
                    id="image_alt"
                    value={editForm.image_alt || ''}
                    onChange={(e) => setEditForm({ ...editForm, image_alt: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cta_text">CTA Button Text</Label>
                  <Input
                    id="cta_text"
                    value={editForm.cta_text || ''}
                    onChange={(e) => setEditForm({ ...editForm, cta_text: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cta_url">CTA Button URL</Label>
                  <Input
                    id="cta_url"
                    value={editForm.cta_url || ''}
                    onChange={(e) => setEditForm({ ...editForm, cta_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={editForm.is_active ?? true}
                  onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="is_active" className="cursor-pointer">Aktiv (auf Website anzeigen)</Label>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={handleSave} disabled={saving === editForm.id}>
                  {saving === editForm.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Speichern...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Speichern
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Abbrechen
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content Blocks by Section */}
        <div className="space-y-6">
          {Object.entries(groupedBlocks).map(([section, sectionBlocks]) => (
            <Card key={section}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  <CardTitle className="capitalize">{section}</CardTitle>
                </div>
                <CardDescription>
                  {sectionBlocks.length} Block{sectionBlocks.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sectionBlocks.map((block) => (
                    <div
                      key={block.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{block.title || block.block_key}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-2xl">
                          {block.content || block.subtitle || '—'}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 bg-muted rounded">
                            {block.block_type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {block.block_key}
                          </span>
                          {!block.is_active && (
                            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded">
                              Inaktiv
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(block)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Bearbeiten
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBlocks.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Keine Blöcke gefunden
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
