'use strict';

const {
    util: { checkType }
} = require('../../core');

const MetricsAggregationBase = require('./metrics-aggregation-base');

const ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-percentile-rank-aggregation.html';

/**
 * A multi-value metrics aggregation that calculates one or more percentile ranks
 * over numeric values extracted from the aggregated documents. These values can
 * be extracted either from specific numeric fields in the documents, or be
 * generated by a provided script.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-percentile-rank-aggregation.html)
 *
 * Aggregation that calculates one or more percentiles ranks over numeric values
 * extracted from the aggregated documents.
 *
 * @extends MetricsAggregationBase
 */
class PercentileRanksAggregation extends MetricsAggregationBase {

    /**
     * Creates an instance of PercentileRanksAggregation
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on. It must be a numeric field
     * @param {Array=} values Values to compute percentiles from.
     * @returns {PercentileRanksAggregation} returns `this` so that calls can be chained
     * @throws {TypeError} If `values` is not an instance of Array
     */
    constructor(name, field, values) {
        super(name, 'percentile_ranks', field);
        checkType(values, Array);

        this._aggsDef.values = values;
        return this;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on PercentileRanksAggregation
     */
    format() {
        // Not 100% sure about this.
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('format is not supported in PercentileRanksAggregation');
    }

    /**
     * Enable the response to be returned as a keyed object where the key is the
     * bucket interval.
     *
     * @param {boolean} keyed To enable keyed response or not.
     * @returns {PercentilesAggregation} returns `this` so that calls can be chained
     */
    keyed(keyed) {
        this._aggsDef.keyed = keyed;
        return this;
    }

    /**
     * Specifies the values to compute percentiles from.
     *
     * @param {Array} values Values to compute percentiles from.
     * @returns {PercentileRanksAggregation} returns `this` so that calls can be chained
     * @throws {TypeError} If `values` is not an instance of Array
     */
    values(values) {
        checkType(values, Array);
        this._aggsDef.values = values;
        return this;
    }

    /**
     * Compression controls memory usage and approximation error. The compression
     * value limits the maximum number of nodes to 100 * compression. By
     * increasing the compression value, you can increase the accuracy of your
     * percentiles at the cost of more memory. Larger compression values also make
     * the algorithm slower since the underlying tree data structure grows in
     * size, resulting in more expensive operations. The default compression
     * value is 100.
     *
     * @param {number} compression Parameter to balance memory utilization with estimation accuracy.
     * @returns {PercentileRanksAggregation} returns `this` so that calls can be chained
     */
    compression(compression) {
        this._aggsDef.tdigest = { compression };
        return this;
    }

    /**
     * HDR Histogram (High Dynamic Range Histogram) is an alternative implementation
     * that can be useful when calculating percentiles for latency measurements
     * as it can be faster than the t-digest implementation
     * with the trade-off of a larger memory footprint.
     *
     * The HDR Histogram can be used by specifying the method parameter in the request.
     *
     * @param {number} numberOfSigDigits The resolution of values
     * for the histogram in number of significant digits
     * @returns {PercentileRanksAggregation} returns `this` so that calls can be chained
     */
    hdr(numberOfSigDigits) {
        this._aggsDef.hdr = { number_of_significant_value_digits: numberOfSigDigits };
        return this;
    }
}

module.exports = PercentileRanksAggregation;
