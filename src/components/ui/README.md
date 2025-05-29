# 🎨 Premium UI Components Library

Une collection de composants UI réutilisables pour l'application CMMS avec un design premium et moderne.

## 📦 Composants Disponibles

### 🔘 Button
Bouton polyvalent avec plusieurs variantes et tailles.

```jsx
import { Button, Plus, Save } from '../components/ui';

// Bouton primaire
<Button variant="primary" icon={Plus}>
  Ajouter
</Button>

// Bouton de sauvegarde avec loading
<Button variant="success" icon={Save} loading={isLoading}>
  Sauvegarder
</Button>

// Bouton icône seulement
<Button variant="icon" icon={Edit3} title="Modifier" />
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost' | 'icon'
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `icon`: Composant d'icône Lucide
- `iconPosition`: 'left' | 'right'
- `loading`: boolean
- `disabled`: boolean

### 📊 StatCard
Carte de statistiques avec icône, tendance et barre de progression.

```jsx
import { StatCard, TrendingUp, CheckCircle } from '../components/ui';

<StatCard
  title="Engins Disponibles"
  value={42}
  subtitle="Prêts à l'utilisation"
  icon={CheckCircle}
  color="green"
  trend={TrendingUp}
  trendValue="+5.2%"
  progress={85}
  progressLabel="Performance"
/>
```

**Props:**
- `title`: string - Titre de la carte
- `value`: string | number - Valeur principale
- `subtitle`: string - Sous-titre optionnel
- `icon`: Composant d'icône
- `color`: 'blue' | 'green' | 'red' | 'purple' | 'amber' | 'gray'
- `trend`: Composant d'icône pour la tendance
- `trendValue`: string - Valeur de tendance
- `progress`: number - Pourcentage pour la barre de progression
- `progressLabel`: string - Label pour la barre de progression

### 🔍 FilterBar
Barre de filtres avec inputs personnalisables.

```jsx
import { FilterBar } from '../components/ui';

<FilterBar
  title="Filtres Avancés"
  subtitle="Affinez votre recherche"
  onClearFilters={clearAllFilters}
>
  <FilterBar.Grid columns={4}>
    <FilterBar.Input
      label="Recherche"
      emoji="🔍"
      type="search"
      placeholder="Rechercher..."
      value={searchTerm}
      onChange={setSearchTerm}
      clearable
    />
    
    <FilterBar.Input
      label="Statut"
      emoji="📊"
      type="select"
      value={selectedStatus}
      onChange={setSelectedStatus}
      options={[
        { value: 'active', label: 'Actif' },
        { value: 'inactive', label: 'Inactif' }
      ]}
    />
  </FilterBar.Grid>
</FilterBar>
```

### 📋 Table
Table premium avec colonnes personnalisables et actions.

```jsx
import { Table, Eye, Edit3, Trash2 } from '../components/ui';

const columns = [
  {
    key: 'id',
    label: 'ID',
    emoji: '🆔',
    render: (value) => <span className="font-bold">{value}</span>
  },
  {
    key: 'name',
    label: 'Nom',
    emoji: '📝'
  },
  {
    key: 'status',
    label: 'Statut',
    emoji: '📊',
    render: (value) => (
      <Table.StatusBadge variant={value === 'active' ? 'success' : 'danger'}>
        {value}
      </Table.StatusBadge>
    )
  },
  {
    key: 'actions',
    label: 'Actions',
    emoji: '🎯',
    render: (_, row) => (
      <Table.ActionButtons
        actions={[
          { icon: Eye, title: 'Voir', onClick: () => view(row.id) },
          { icon: Edit3, title: 'Modifier', onClick: () => edit(row.id) },
          { icon: Trash2, title: 'Supprimer', onClick: () => delete(row.id) }
        ]}
      />
    )
  }
];

<Table
  title="Liste des Éléments"
  subtitle="Gestion complète"
  icon={Settings}
  headerColor="blue"
  data={items}
  columns={columns}
  onRowClick={(row) => console.log('Clicked:', row)}
/>
```

### 📄 PageHeader
En-tête de page avec titre, actions et boutons.

```jsx
import { PageHeader, Settings, Plus } from '../components/ui';

<PageHeader
  title="Gestion des Engins"
  subtitle="Surveillance et contrôle de la flotte"
  icon={Settings}
  actions={[
    {
      icon: Plus,
      children: 'Ajouter',
      onClick: () => addNew()
    }
  ]}
  showLastUpdated={true}
  showRefresh={true}
  showExport={true}
  onRefresh={() => refresh()}
  onExport={() => exportData()}
/>
```

### 🏗️ Layout
Composants de mise en page pour structurer les pages.

```jsx
import { Layout } from '../components/ui';

<Layout maxWidth="7xl" padding="default">
  <Layout.Section title="Statistiques" subtitle="Vue d'ensemble">
    <Layout.Grid cols={4} gap={6}>
      <StatCard {...} />
      <StatCard {...} />
      <StatCard {...} />
      <StatCard {...} />
    </Layout.Grid>
  </Layout.Section>
  
  <Layout.Card padding="lg" shadow="xl">
    <FilterBar {...} />
  </Layout.Card>
  
  <Table {...} />
</Layout>
```

## 🎨 Couleurs Disponibles

- **blue**: Bleu principal (par défaut)
- **green**: Vert pour succès/disponible
- **red**: Rouge pour erreur/indisponible
- **purple**: Violet pour métriques spéciales
- **amber**: Ambre pour avertissements
- **gray**: Gris pour éléments neutres

## 🚀 Utilisation Rapide

```jsx
import React, { useState } from 'react';
import {
  Layout,
  PageHeader,
  StatCard,
  FilterBar,
  Table,
  Button,
  Settings,
  Plus,
  CheckCircle,
  TrendingUp
} from '../components/ui';

function MyPage() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});

  return (
    <Layout>
      <PageHeader
        title="Ma Page"
        icon={Settings}
        actions={[{ icon: Plus, children: 'Ajouter' }]}
      />
      
      <Layout.Grid cols={3}>
        <StatCard title="Total" value={100} icon={CheckCircle} color="blue" />
        <StatCard title="Actifs" value={85} icon={TrendingUp} color="green" />
        <StatCard title="Inactifs" value={15} icon={AlertTriangle} color="red" />
      </Layout.Grid>
      
      <FilterBar onClearFilters={() => setFilters({})}>
        <FilterBar.Grid columns={3}>
          <FilterBar.Input label="Recherche" type="search" />
          <FilterBar.Input label="Statut" type="select" />
          <FilterBar.Input label="Type" type="select" />
        </FilterBar.Grid>
      </FilterBar>
      
      <Table
        title="Données"
        data={data}
        columns={columns}
      />
    </Layout>
  );
}
```

## 📱 Responsive Design

Tous les composants sont conçus pour être responsive et s'adaptent automatiquement aux différentes tailles d'écran :

- **Mobile**: Colonnes empilées, boutons adaptés
- **Tablet**: Grilles 2 colonnes, navigation optimisée
- **Desktop**: Grilles complètes, toutes les fonctionnalités

## 🎯 Bonnes Pratiques

1. **Consistance**: Utilisez les mêmes couleurs et tailles dans toute l'application
2. **Accessibilité**: Tous les boutons ont des titres et les contrastes sont respectés
3. **Performance**: Les composants utilisent useMemo et useCallback quand nécessaire
4. **Réutilisabilité**: Préférez la composition aux props complexes
5. **Maintenance**: Centralisez les styles dans les composants UI
