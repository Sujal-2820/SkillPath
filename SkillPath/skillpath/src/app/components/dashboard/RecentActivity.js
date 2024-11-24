import { CheckCircle, MessageSquare, Award } from 'lucide-react'

export default function RecentActivity() {
  const activities = [
    { id: 1, type: 'completion', content: 'Completed "Introduction to HTML" module', icon: CheckCircle, time: '1hr ago' },
    { id: 2, type: 'forum', content: 'Posted in "JavaScript Basics" forum', icon: MessageSquare, time: '1hr ago' },
    { id: 3, type: 'achievement', content: 'Earned "CSS Master" badge', icon: Award, time: '2hr ago' },
  ]

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Recent Activity</h2>
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 ? (
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex  space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                        <activity.icon className="h-5 w-5 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">{activity.content}</p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime="2020-09-20">{activity.time}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}