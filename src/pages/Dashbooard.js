import React, { useState, useMemo } from 'react';
import {
  Layout,
  PageHeader,
  StatCard,
  ChartCard,
  FilterBar,
  CheckCircle,
  TrendingUp,
  XCircle,
  TrendingDown,
  Activity,
  Users,
  Settings
} from '../components/ui';
import Button from '../components/ui/Button';
import { Plus, Download, RefreshCw } from 'lucide-react';

function Dashboard() {
    const [timeRange, setTimeRange] = useState('7d');

    const addNew = () => {
        // Implement add new functionality
    };

    // Sample data for charts
    const disponibilityTrendData = useMemo(() => [
        { name: 'Lun', disponibles: 42, maintenance: 8, affectes: 17 },
        { name: 'Mar', disponibles: 45, maintenance: 6, affectes: 16 },
        { name: 'Mer', disponibles: 38, maintenance: 12, affectes: 17 },
        { name: 'Jeu', disponibles: 41, maintenance: 9, affectes: 17 },
        { name: 'Ven', disponibles: 44, maintenance: 7, affectes: 16 },
        { name: 'Sam', disponibles: 39, maintenance: 11, affectes: 17 },
        { name: 'Dim', disponibles: 42, maintenance: 10, affectes: 15 }
    ], []);

    const affectationStatusData = useMemo(() => [
        { name: 'Disponibles', value: 42, color: '#10B981' },
        { name: 'Affectés', value: 15, color: '#3B82F6' },
        { name: 'Maintenance', value: 10, color: '#EF4444' }
    ], []);

    const engineTypeData = useMemo(() => [
        { name: 'Levage', disponibles: 15, maintenance: 3, affectes: 7 },
        { name: 'Roulants', disponibles: 18, maintenance: 4, affectes: 5 },
        { name: 'Accessoires', disponibles: 9, maintenance: 3, affectes: 3 }
    ], []);

    const performanceData = useMemo(() => [
        { name: 'Jan', utilisation: 85, efficacite: 92, disponibilite: 88 },
        { name: 'Fév', utilisation: 88, efficacite: 89, disponibilite: 91 },
        { name: 'Mar', utilisation: 82, efficacite: 94, disponibilite: 86 },
        { name: 'Avr', utilisation: 90, efficacite: 91, disponibilite: 93 },
        { name: 'Mai', utilisation: 87, efficacite: 88, disponibilite: 89 },
        { name: 'Jun', utilisation: 91, efficacite: 95, disponibilite: 92 }
    ], []);

    return (

        <Layout>
        <PageHeader
          title="Tableau de Bord"
          subtitle="Vue d'ensemble de la flotte"
          icon={Users}
          actions={[
            {
              icon: Plus,
              children: 'Ajouter',
              onClick: () => addNew()
            }
          ]}
        />

        <Layout.Section title="Statistiques" subtitle="Vue d'ensemble">

       <Layout.Grid cols={4}>
       <StatCard
          title="Engins Disponibles"
          value={42}
          subtitle="Prêts à l'utilisation"
          icon={CheckCircle}
          color="green"
          trend={TrendingUp}
          trendValue="+5.2%"
       />
       <StatCard
          title="Engins en Maintenance"
          value={10}
          subtitle="En cours de réparation"
          icon={XCircle}
          color="red"
          trend={TrendingDown}
          trendValue="-2.1%"
       />
       <StatCard
          title="Engins en Cours d'Affectation"
          value={15}
          subtitle="Assignés aux opérateurs"
          icon={Activity}
          color="blue"
          trend={TrendingUp}
          trendValue="+1.8%"
       />
       <StatCard
          title="Total des Engins"
          value={67}
          subtitle="Dans la flotte"
          icon={Users}
          color="purple"
          trend={TrendingUp}
          trendValue="+3.5%"
       />
       </Layout.Grid>
        </Layout.Section>

        {/* Charts Section */}
        <Layout.Section title="Analyse des Tendances" subtitle="Évolution de la disponibilité et affectation">
          <Layout.Grid cols={2} gap={6}>
            <ChartCard
              title="Tendance Disponibilité"
              subtitle="Évolution hebdomadaire des engins"
              type="area"
              data={disponibilityTrendData}
              dataKey="disponibles"
              color="green"
              height={300}
              actions={
                <Button variant="ghost" size="sm" icon={RefreshCw}>
                  Actualiser
                </Button>
              }
            />

            <ChartCard
              title="Répartition des Statuts"
              subtitle="Distribution actuelle des engins"
              type="pie"
              data={affectationStatusData}
              dataKey="value"
              color="blue"
              height={300}
              showLegend={false}
            />
          </Layout.Grid>
        </Layout.Section>

        {/* Performance Analytics */}
        <Layout.Section title="Analyse de Performance" subtitle="Métriques d'efficacité et utilisation">
          <Layout.Grid cols={1}>
            <ChartCard
              title="Performance Mensuelle"
              subtitle="Utilisation, efficacité et disponibilité par mois"
              type="line"
              data={performanceData}
              dataKeys={['utilisation', 'efficacite', 'disponibilite']}
              colors={['#3B82F6', '#10B981', '#F59E0B']}
              color="blue"
              height={350}
              actions={
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" icon={Download}>
                    Exporter
                  </Button>
                  <Button variant="ghost" size="sm" icon={Settings}>
                    Configurer
                  </Button>
                </div>
              }
            />
          </Layout.Grid>
        </Layout.Section>

        {/* Engine Type Analysis */}
        <Layout.Section title="Analyse par Type d'Engin" subtitle="Répartition et statut par catégorie">
          <Layout.Grid cols={2} gap={6}>
            <ChartCard
              title="Disponibilité par Type"
              subtitle="Engins disponibles par catégorie"
              type="bar"
              data={engineTypeData}
              dataKey="disponibles"
              color="green"
              height={300}
            />

            <ChartCard
              title="Maintenance par Type"
              subtitle="Engins en maintenance par catégorie"
              type="bar"
              data={engineTypeData}
              dataKey="maintenance"
              color="red"
              height={300}
            />
          </Layout.Grid>
        </Layout.Section>

        {/* Filter and Actions Section */}
        <Layout.Section title="Actions Rapides" subtitle="Filtres et opérations">
          <Layout.Card padding="lg">
            <FilterBar onClearFilters={() => console.log('Filters cleared')}>
              <FilterBar.Grid columns={4}>
                <FilterBar.Input
                  label="Période"
                  type="select"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  options={[
                    { value: '7d', label: '7 derniers jours' },
                    { value: '30d', label: '30 derniers jours' },
                    { value: '90d', label: '3 derniers mois' },
                    { value: '1y', label: 'Dernière année' }
                  ]}
                />
                <FilterBar.Input
                  label="Type d'Engin"
                  type="select"
                  options={[
                    { value: 'all', label: 'Tous les types' },
                    { value: 'levage', label: 'Levage' },
                    { value: 'roulants', label: 'Roulants' },
                    { value: 'accessoires', label: 'Accessoires' }
                  ]}
                />
                <FilterBar.Input
                  label="Statut"
                  type="select"
                  options={[
                    { value: 'all', label: 'Tous les statuts' },
                    { value: 'disponible', label: 'Disponible' },
                    { value: 'affecte', label: 'Affecté' },
                    { value: 'maintenance', label: 'En maintenance' }
                  ]}
                />
                <FilterBar.Input
                  label="Recherche"
                  type="search"
                  placeholder="Rechercher un engin..."
                />
              </FilterBar.Grid>
            </FilterBar>
          </Layout.Card>
        </Layout.Section>

       </Layout>
    );


}

export default Dashboard;
