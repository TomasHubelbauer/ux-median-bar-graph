import React from 'react';
import './MedianBarGraph.css';

export default class MedianBarGraph extends React.Component {
    render() {
        const threshold = this.median(this.props.values.map(value => value.runtime)) * (this.props.factor || 1);
        return (
            <div className="MedianBarGraph">
                {this.props.values.map((value, index) => this.renderBar(index, value, threshold))}
            </div>
        );
    }

    renderBar(index, value, threshold) {
        let className = 'MedianBarGraph-bar';
        switch (value.result) {
            case 'success': className += ' MedianBarGraph-barSuccess'; break;
            case 'error': className += ' MedianBarGraph-barError'; break;
            case 'progress': className += ' MedianBarGraph-barProgress'; break;
            default: break;
        }

        const percent = `${((value.runtime > threshold ? threshold : value.runtime) / threshold) * 100}%`;
        const factor = value.runtime > threshold ? `×${(value.runtime / threshold).toFixed(1)}` : '\u00A0' /* &nbsp; */;
        return (
            <div key={index} className="MedianBarGraph-barBox">
                <span className="MedianBarGraph-factor">{factor}</span>
                <div className="MedianBarGraph-barArea">
                    <div className={className} style={{ height: percent }}>
                        {value.runtime}
                    </div>
                </div>
            </div>
        );
    }

    // https://jonlabelle.com/snippets/view/javascript/calculate-mean-median-mode-and-range-in-javascript
    median(numbers) {
        // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
        var median = 0, numsLen = numbers.length;
        numbers.sort();
     
        if (
            numsLen % 2 === 0 // is even
        ) {
            // average of two middle numbers
            median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
        } else { // is odd
            // middle number only
            median = numbers[(numsLen - 1) / 2];
        }
     
        return median;
    }
}
