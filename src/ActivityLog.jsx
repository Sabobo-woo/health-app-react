import moment from 'moment';

export default function ActivityLog({ lastActivities }) {

    return (
        <div className="activity-log">

            <h2>Latest activities</h2>

            {
                lastActivities.map(activity => (

                    <div
                        key={activity.id}
                        className="activity-log__activity"
                    >

                        <div className="activity-log__name">
                            {activity.type.name}
                        </div>

                        <div className="activity-log__date">
                            {moment(activity.date).format('LL')}
                        </div>

                    </div>

                ))
            }

        </div>
    )

}