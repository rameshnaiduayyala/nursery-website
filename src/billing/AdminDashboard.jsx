import { useEffect, useState } from 'react';
import { ArrowLeft, Database, FileText, Lock, RefreshCw, Settings, Tag } from 'lucide-react';
import { useNursery } from '../context/NurseryContext';

export default function AdminDashboard({ onLock }) {
  const {
    companyDetails,
    plantCategories,
    plantsCollection,
    projectMilestones,
    testimonialsData,
    heroSlides,
    refreshData
  } = useNursery();

  const [activeTab, setActiveTab] = useState('overview');
  const [companyForm, setCompanyForm] = useState({ ...companyDetails });

  useEffect(() => {
    setCompanyForm({ ...companyDetails });
  }, [companyDetails]);

  const stats = [
    { label: 'Categories', value: plantCategories.length },
    { label: 'Plants', value: plantsCollection.length },
    { label: 'Projects', value: projectMilestones.length },
    { label: 'Testimonials', value: testimonialsData.length },
    { label: 'Hero Slides', value: heroSlides.length }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Database },
    { id: 'company', label: 'Company', icon: Settings },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'plants', label: 'Plants', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-forest-black text-warm-ivory font-sans flex flex-col">
      <header className="border-b border-luxury-gold/10 bg-forest-black-secondary/50 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-luxury-gold flex items-center justify-center">
              <Database className="w-5 h-5 text-forest-black" />
            </div>
            <div>
              <h1 className="font-display font-black tracking-tight text-md uppercase">Static Content Admin</h1>
              <p className="text-[10px] text-stone-gray/60 uppercase tracking-widest">Powered by src/data/nurseryData.js</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/billing"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-forest-black border border-luxury-gold/20 text-xs text-stone-gray hover:text-luxury-gold"
            >
              <FileText className="w-4 h-4" />
              Invoice Portal
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-forest-black border border-luxury-gold/20 text-xs text-stone-gray hover:text-luxury-gold"
            >
              <ArrowLeft className="w-4 h-4" />
              Site
            </a>
            <button
              onClick={onLock}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-luxury-gold text-forest-black text-xs font-bold uppercase tracking-wider"
            >
              <Lock className="w-4 h-4" />
              Lock
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        <aside className="space-y-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full px-4 py-3 rounded-lg text-left text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === id
                  ? 'bg-luxury-gold/15 border-l-2 border-luxury-gold text-luxury-gold'
                  : 'text-stone-gray hover:text-warm-ivory hover:bg-forest-black-secondary/60 border-l-2 border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </aside>

        <section className="bg-forest-black-secondary/30 border border-luxury-gold/10 rounded-xl p-6 sm:p-8">
          <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">Static Mode</p>
            <p className="mt-2 text-sm text-stone-gray leading-relaxed">
              This site uses local static data only. Update content in src/data/nurseryData.js, commit the change, and redeploy.
            </p>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-display font-black uppercase">Overview</h2>
                <button
                  onClick={refreshData}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-luxury-gold/20 text-xs text-luxury-gold"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-lg bg-forest-black border border-luxury-gold/10 p-5">
                    <p className="text-3xl font-display font-black text-warm-ivory">{stat.value}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-wider text-stone-gray">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="space-y-5 max-w-3xl">
              <h2 className="text-2xl font-display font-black uppercase">Company Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ['Name', companyForm.name],
                  ['Subtitle', companyForm.subtitle],
                  ['Phone', companyForm.phone],
                  ['Alternate Phone', companyForm.phoneAlt],
                  ['Email', companyForm.email],
                  ['GSTIN', companyForm.gstin],
                  ['PAN', companyForm.pan],
                  ['City', companyForm.city]
                ].map(([label, value]) => (
                  <ReadOnlyField key={label} label={label} value={value} />
                ))}
              </div>
              <ReadOnlyField label="Address" value={companyForm.address} />
            </div>
          )}

          {activeTab === 'categories' && (
            <StaticTable
              title="Categories"
              rows={plantCategories}
              columns={[
                ['Name', 'name'],
                ['Group', 'group'],
                ['Count', 'count'],
                ['Description', 'description']
              ]}
            />
          )}

          {activeTab === 'plants' && (
            <StaticTable
              title="Plants"
              rows={plantsCollection}
              columns={[
                ['Name', 'name'],
                ['Botanical', 'botanical'],
                ['Category', 'category'],
                ['Availability', 'availability']
              ]}
            />
          )}
        </section>
      </main>
    </div>
  );
}

function ReadOnlyField({ label, value }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-wider text-stone-gray mb-2">{label}</span>
      <input
        readOnly
        value={value || ''}
        className="w-full bg-forest-black border border-luxury-gold/15 rounded-lg px-3 py-2 text-sm text-warm-ivory"
      />
    </label>
  );
}

function StaticTable({ title, rows, columns }) {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-display font-black uppercase">{title}</h2>
      <div className="overflow-x-auto rounded-lg border border-luxury-gold/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-forest-black text-[10px] uppercase tracking-wider text-stone-gray">
            <tr>
              {columns.map(([label]) => (
                <th key={label} className="px-4 py-3 font-bold">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-luxury-gold/10">
            {rows.map((row, index) => (
              <tr key={row.id || row.name || index}>
                {columns.map(([label, key]) => (
                  <td key={label} className="px-4 py-3 text-stone-gray max-w-sm truncate">
                    {row[key] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
