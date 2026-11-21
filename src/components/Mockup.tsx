import type { Mockup as MockupKind } from '../content'

const CHART = [38, 52, 45, 61, 57, 70, 64, 76, 68, 82, 94]

export function Mockup({ kind }: { kind: MockupKind }) {
  switch (kind) {
    case 'phone':
      return (
        <>
          <div className="mock m-phone">
            <div className="m-top">
              <span className="m-dot" />
              <span className="m-line w-1/2" />
            </div>
            <div className="m-card">
              <span className="m-small">Next appointment</span>
              <b>Tue, 10:30 am</b>
              <span className="m-small">Dental check-up</span>
            </div>
            {[70, 50, 60].map((w) => (
              <div key={w} className="m-row">
                <span className="m-avatar" />
                <span className="m-line" style={{ width: `${w}%` }} />
              </div>
            ))}
            <div className="m-btn">Book a visit</div>
          </div>
          <div className="m-toast">Reminder sent</div>
        </>
      )
    case 'browser':
      return (
        <div className="mock m-browser">
          <div className="m-bar">
            <i />
            <i />
            <i />
          </div>
          <div className="m-body">
            <div className="m-side">
              {[80, 60, 70, 50].map((w) => (
                <span key={w} className="m-line" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="m-main">
              <div className="m-kpis">
                <div>
                  <span className="m-small">Orders today</span>
                  <b>128</b>
                </div>
                <div>
                  <span className="m-small">Low stock</span>
                  <b>6</b>
                </div>
                <div>
                  <span className="m-small">Sales</span>
                  <b>₹84k</b>
                </div>
              </div>
              <div className="m-chart">
                {CHART.map((h, i) => (
                  <span key={i} className={i === CHART.length - 1 ? 'hi' : undefined} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    case 'chat':
      return (
        <div className="mock m-chat">
          <div className="m-msg them">How do I change my billing date?</div>
          <div className="m-msg us">
            Go to Settings, then Billing, and pick a new date. It applies from next month.
            <span className="m-src">From: Billing help article</span>
          </div>
          <div className="m-msg them">Can I talk to a person?</div>
          <div className="m-msg us">Of course. I've passed this to the support team.</div>
        </div>
      )
    case 'terminal':
      return (
        <div className="mock m-term">
          <div className="m-bar">
            <i />
            <i />
            <i />
          </div>
          <div className="m-tbody">
            {[
              ['Build image', '1m 08s'],
              ['Run tests', '2m 31s'],
              ['Scan for vulnerabilities', '22s'],
              ['Deploy to staging', '47s'],
            ].map(([label, time]) => (
              <p key={label}>
                <span>✓</span>
                {label}
                <em>{time}</em>
              </p>
            ))}
            <p>
              <span className="run">●</span>Deploy to production<em className="run">running</em>
            </p>
          </div>
        </div>
      )
  }
}
