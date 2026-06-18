export default function Cockpit() {
  return (
    <section className="how pad" id="features">
      <span className="sec-index">01 — THE COCKPIT</span>
      <div className="wrap">
        <div className="cockpit" data-reveal aria-hidden="true">
          <div className="ck-bar">
            <div className="lhs">
              <div className="ck-dots">
                <i className="r" />
                <i className="g" />
                <i className="m" />
              </div>
              <span className="mono-lbl">PIPESIGHT_OBSERVABILITY_COCKPIT // v0.4.1</span>
            </div>
            <div className="rhs">
              <span className="mono-lbl">SYS_LOAD: 0.12</span>
              <span className="mono-lbl live">LIVE_FEED</span>
            </div>
          </div>

          <div className="ck-body">
            <div className="ck-left">
              <div className="ck-panel flex1">
                <span className="mono-lbl">ACTIVE_PIPELINES</span>
                <div className="pl-list">
                  <div className="pl-row">
                    <span className="pl-name">INGEST_AWS_S3</span>
                    <span className="pl-track">
                      <span className="node" style={{ left: '25%' }} />
                      <span className="node" style={{ left: '75%' }} />
                    </span>
                    <span className="pl-end">
                      <span className="pl-badge">RUNNING</span>
                    </span>
                  </div>

                  <div className="pl-row">
                    <span className="pl-name">TRANSFORM_ETL_02</span>
                    <span className="pl-track fail">
                      <span className="failnode">
                        <i />
                        <span>JOB_FAIL</span>
                      </span>
                    </span>
                    <span className="pl-end">
                      <span className="pl-badge caught">CAUGHT</span>
                      <span className="pl-sub">12ms response</span>
                    </span>
                  </div>

                  <div className="pl-row">
                    <span className="pl-name">EXPORT_SQL_SYNC</span>
                    <span className="pl-track">
                      <span className="node" style={{ left: '33%' }} />
                    </span>
                    <span className="pl-end">
                      <span className="pl-badge">SYNCED</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="ck-logs">
                <p>
                  <span className="t">[12:04:12]</span> ATTEMPTING_RECOVERY: TRANSFORM_ETL_02…
                </p>
                <p>
                  <span className="t">[12:04:12]</span> PIPESIGHT_INTERCEPTION: Triggering Slack
                  webhook.
                </p>
                <p>
                  <span className="t">[12:04:13]</span> ACTION: Suppressing duplicate alert 0x4FF2…
                </p>
                <p>
                  <span className="t">[12:04:15]</span> STATUS: Nominal. Waiting for upstream
                  telemetry.
                </p>
              </div>
            </div>

            <div className="ck-right">
              <div className="ck-panel">
                <span className="mono-lbl">ALERTS_TODAY</span>
                <div className="ck-metric">
                  <div className="row">
                    <span className="big">1,024</span>
                    <span className="mono-lbl">suppressed</span>
                  </div>
                </div>
              </div>
              <div className="ck-panel flex1">
                <span className="mono-lbl">SIGNAL_QUALITY</span>
                <div className="ck-srow">
                  <span className="mono-lbl">S/N ratio</span>
                  <span className="mono-lbl v">HIGH</span>
                </div>
                <div className="ck-bars">
                  <i style={{ height: '40%', opacity: 0.2 }} />
                  <i style={{ height: '60%', opacity: 0.4 }} />
                  <i style={{ height: '90%', opacity: 0.8 }} />
                  <i style={{ height: '75%', opacity: 0.6 }} />
                  <i style={{ height: '30%', opacity: 0.2 }} />
                  <i style={{ height: '55%', opacity: 0.5 }} />
                  <i style={{ height: '85%', opacity: 1 }} />
                </div>
                <p className="ck-note">
                  Noise reduction active. Correlating 400+ trace signals into single incident
                  context.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
