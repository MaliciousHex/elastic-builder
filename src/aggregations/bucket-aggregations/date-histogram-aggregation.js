'use strict';

const HistogramAggregationBase = require('./histogram-aggregation-base');

/**
 * A multi-bucket aggregation similar to the histogram except it can only be applied on date values.
 * The interval can be specified by date/time expressions.
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-datehistogram-aggregation.html#_scripts)
 *
 * @extends HistogramAggregationBase
 */
class DateHistogramAggregation extends HistogramAggregationBase {

    /**
     * Creates an instance of DateHistogramAggregation
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @param {string=} interval Interval to generate histogram over.
     * Available expressions for interval: year, quarter, month, week, day, hour, minute, second
     * @returns {DateHistogramAggregation} returns `this` so that calls can be chained
     */
    constructor(name, field, interval) {
        super(name, 'date_histogram', field);

        interval && this.interval(interval);

        return this;
    }

    /**
     * Date-times are stored in Elasticsearch in UTC.
     * By default, all bucketing and rounding is also done in UTC.
     * The `time_zone` parameter can be used to indicate that bucketing should use a different time zone.
     * Sets the date time zone
     *
     * @param {string} tz Time zone. Time zones may either be specified
     * as an ISO 8601 UTC offset (e.g. +01:00 or -08:00) or as a timezone id,
     * an identifier used in the TZ database like America/Los_Angeles.
     * @returns {DateHistogramAggregation} returns `this` so that calls can be chained
     */
    timeZone(tz) {
        this._aggsDef.time_zone = tz;
        return this;
    }
}

module.exports = DateHistogramAggregation;
