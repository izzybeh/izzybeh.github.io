import { Clock, Layers, ArrowRight } from "lucide-react";

type Status = "considering" | "planned" | "in-progress";

interface BacklogItem {
  id: string;
  title: string;
  description: string;
  context: string;
  status: Status;
  area: string;
}

const items: BacklogItem[] = [
  {
    id: "coast-mode",
    title: "Coast Mode milestone",
    description:
      "A third Freedom Timeline milestone between Essentials Covered and Full Freedom. Coast Mode marks the point where retirement accounts are sufficiently funded and the user only needs to cover living expenses — no further retirement contributions required.",
    context:
      "Removed from the homepage Freedom Timeline to simplify the initial milestone model. The current two-milestone approach (Essentials Covered → Full Freedom) is cleaner for onboarding. Coast Mode adds meaningful nuance once users are inside the product.",
    status: "considering",
    area: "Freedom Timeline",
  },
];

const statusConfig: Record<
  Status,
  { label: string; className: string }
> = {
  considering: {
    label: "Considering",
    className: "bg-warm-gray-100 text-warm-gray-600 border border-warm-gray-200",
  },
  planned: {
    label: "Planned",
    className: "bg-deep-teal-50 text-deep-teal-700 border border-deep-teal-200",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-seafoam-50 text-seafoam-700 border border-seafoam-200",
  },
};

export function Backlog() {
  const grouped = items.reduce<Record<string, BacklogItem[]>>((acc, item) => {
    if (!acc[item.area]) acc[item.area] = [];
    acc[item.area].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-3xl mx-auto space-y-16">

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Layers className="w-6 h-6 text-warm-gray-400" />
            <p className="text-xs uppercase tracking-widest text-warm-gray-400">
              Internal
            </p>
          </div>
          <h1 className="text-4xl sm:text-5xl text-warm-gray-900 leading-tight">
            Product Backlog
          </h1>
          <p className="text-lg text-warm-gray-600 leading-relaxed max-w-xl">
            Features and ideas that have been intentionally deferred. Not
            abandoned — just not yet.
          </p>
        </div>

        {/* Items by area */}
        <div className="space-y-12">
          {Object.entries(grouped).map(([area, areaItems]) => (
            <div key={area} className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-warm-gray-200">
                <h2 className="text-sm uppercase tracking-widest text-warm-gray-500">
                  {area}
                </h2>
                <span className="text-xs text-warm-gray-400">
                  {areaItems.length} item{areaItems.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-4">
                {areaItems.map((item) => {
                  const status = statusConfig[item.status];
                  return (
                    <div
                      key={item.id}
                      className="bg-paper border border-warm-gray-200 rounded-2xl p-6 sm:p-8 space-y-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl text-warm-gray-900">
                          {item.title}
                        </h3>
                        <span
                          className={`flex-shrink-0 text-xs px-3 py-1 rounded-full ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </div>

                      <p className="text-base text-warm-gray-700 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="pt-2 border-t border-warm-gray-100">
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-warm-gray-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-warm-gray-500 leading-relaxed">
                            {item.context}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state for future items */}
        {items.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <p className="text-warm-gray-400">Nothing here yet.</p>
            <p className="text-sm text-warm-gray-400">
              Deferred items will appear here as the product evolves.
            </p>
          </div>
        )}

        {/* Footer note */}
        <div className="pt-4 border-t border-warm-gray-100">
          <div className="flex items-center gap-2 text-sm text-warm-gray-400">
            <ArrowRight className="w-4 h-4" />
            <span>
              Status: <span className="text-warm-gray-500">Considering</span> →{" "}
              <span className="text-warm-gray-500">Planned</span> →{" "}
              <span className="text-warm-gray-500">In Progress</span> → shipped
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
