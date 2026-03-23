const stats = [
  { value: '500+',      label: 'Moves Completed',        sub: 'Local, long-distance & packing' },
  { value: '4.9 ★',    label: 'Top-Rated',               sub: 'Across verified platforms' },
  { value: '< 2 hrs',   label: 'Response Time',         sub: 'Coordinator calls you back' },
  { value: '$0',        label: 'Hidden Fees',             sub: 'Final price confirmed in writing' },
];

export default function StatsBar() {
  return (
    <section className="relative bg-charcoal overflow-hidden -mt-px">
      {/* Gold gradient borders */}
      <div className="absolute top-0 left-0 right-0 h-px gold-separator" />
      <div className="absolute bottom-0 left-0 right-0 h-px gold-separator" />
      {/* Film grain */}
      <div className="absolute inset-0 grain-overlay" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center px-3 sm:px-6 py-4 ${
                i < stats.length - 1 ? 'border-r border-white/[0.07]' : ''
              }`}
            >
              <p className="font-display text-xl sm:text-3xl font-bold text-gold mb-2 tracking-wide">{stat.value}</p>
              <p className="text-white text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-gray-600 text-xs leading-snug">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
