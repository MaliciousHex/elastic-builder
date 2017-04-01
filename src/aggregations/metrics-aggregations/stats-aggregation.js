'use strict';

const MetricsAggregationBase = require('./metrics-aggregation-base');

/**
 * A multi-value metrics aggregation that computes stats over numeric values
 * extracted from the aggregated documents. These values can be extracted either
 * from specific numeric fields in the documents, or be generated by a provided
 * script.
 *
 * The stats that are returned consist of: min, max, sum, count and avg.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-stats-aggregation.html)
 *
 * Aggregation that computes stats over numeric values extracted from the
 * aggregated documents.
 *
 * @extends MetricsAggregationBase
 */
class StatsAggregation extends MetricsAggregationBase {

    /**
     * Creates an instance of StatsAggregation
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @returns {StatsAggregation} returns `this` so that calls can be chained
     */
    constructor(name, field) {
        super(name, 'stats', field);
        return this;
    }
}

module.exports = StatsAggregation;
