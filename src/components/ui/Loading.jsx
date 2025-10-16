const Loading = ({ type = "default" }) => {
  if (type === "table") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 shimmer rounded"></div>
          <div className="h-10 w-32 shimmer rounded"></div>
        </div>
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 bg-white rounded-lg border">
              <div className="w-10 h-10 shimmer rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 shimmer rounded w-3/4"></div>
                <div className="h-4 shimmer rounded w-1/2"></div>
              </div>
              <div className="h-4 w-24 shimmer rounded"></div>
              <div className="h-4 w-20 shimmer rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "grid") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 shimmer rounded"></div>
          <div className="h-10 w-32 shimmer rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="p-6 bg-white rounded-lg border">
              <div className="w-12 h-12 shimmer rounded-full mb-4"></div>
              <div className="space-y-2">
                <div className="h-6 shimmer rounded w-3/4"></div>
                <div className="h-4 shimmer rounded w-1/2"></div>
                <div className="h-4 shimmer rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "kanban") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, col) => (
          <div key={col} className="space-y-4">
            <div className="h-8 w-24 shimmer rounded"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 bg-white rounded-lg border">
                  <div className="space-y-2">
                    <div className="h-5 shimmer rounded w-3/4"></div>
                    <div className="h-4 shimmer rounded w-1/2"></div>
                    <div className="h-4 shimmer rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy"></div>
    </div>
  );
};

export default Loading;