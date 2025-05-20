export default function AdminStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
        >
          <dt>
            <div className="absolute rounded-md bg-blue-500 p-3">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={stat.icon}
                />
              </svg>
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {stat.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
          </dd>
        </div>
      ))}
    </div>
  );
} 