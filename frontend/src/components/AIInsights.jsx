function AIInsights({ insights }) {

  return (

    <div className="ai-insights">

      <h2>AI Financial Insights</h2>

      {insights.length === 0 ? (

        <p>No insights available</p>

      ) : (

        insights.map((insight, index) => (

          <div key={index} className="insight-item">
            • {insight}
          </div>

        ))

      )}

    </div>

  );

}

export default AIInsights;