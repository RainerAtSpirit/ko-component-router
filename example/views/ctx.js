'use strict'

const $ = require('jquery')
const ko = require('knockout')

ko.components.register('context', {
  synchronous: true,
  viewModel: class Context {
    constructor(ctx) {
      this.sub = ctx.hash.subscribe((h) => {
        $(`#${h}`).velocity('scroll')
      })
    }
    dispose() {
      this.sub.dispose()
    }
  },
  template: `
    <div class="component-container">
      <section>
        <h2 id="params">
          params
          <small class="text-muted">read-only</small>
        </h2>
        <p>
          route params are directly accessible as read-only observables via
          <code>ctx.params</code>
        </p>

<pre><code data-bind="prism: 'javascript'">
// route: '/user/:id/:operation?'

class ViewModel {
  constructor(ctx) {
    // @ '/user/1234'
    ctx.params.id() // 1234
    ctx.params.operation() // null

    // @ '/user/1234/edit'
    ctx.params.id() // 1234
    ctx.params.operation() // 'edit'
  }
}
</code></pre>

      </section>

      <section>
        <h2 id="query">
          query
          <small class="text-muted">read/write</small>
        </h2>
        <p>
          read/write query parameter observables are accessible via
          <code>ctx.query.get(parameterName, defaultValue)</code>
        </p>
        <p>
          query params are scoped to the local router, so you may use the same
          name for params across different components, or nest the same component
          within itself, and maintain separate states.
        </p>
        <p>
          query params that don't exist in the querystring will be initialized
          to their default values (if defined), and params that match their default
          values will not pollute the querystring.
        </p>
        <p>
          <em>See the page on <a data-bind="path: '/nested-routing'">nested routing</a> for an example</em>
        </p>

<pre><code data-bind="prism: 'javascript'">
class ViewModel {
  constructor(ctx) {
    // read/write observable for 'foobar' querystring parameter with
    // a default value of 'foo'
    this.foobar = ctx.query.get('foobar', 'foo')

    // set 'foobar' to 'bar'
    this.foobar('bar')

    // reset all params to their default values; triggers only
    // one update
    ctx.query.clear()

    // update multiple query params; triggers only one update
    ctx.query.update({
      foo: randomString(),
      bar: randomString()
    })
  }
}
</code></pre>

      </section>

      <section>
        <h2 id="state">
          state
          <small class="text-muted">read/write</small>
        </h2>
        <p>
          read/write observable history.state abstraction accessible directly via
          <code>ctx.state()</code>
        </p>
        <p>
          scoped to local router, similarly to query params
        </p>
        <p>
          <em>See the page on <a data-bind="path: '/nested-routing'">nested routing</a> for an example</em>
        </p>
      </section>

      <section>
        <h2 id="route">
          route
          <small class="text-muted">read-only</small>
        </h2>
        <p>
          read-only observable containing route
        </p>
      </section>

      <section>
        <h2 id="path">
          path
          <small class="text-muted">read-only</small>
        </h2>
        <p>
          read-only observable containing path relevant to local router
        </p>
      </section>

      <section>
        <h2 id="pathname">
          pathname
          <small class="text-muted">read-only</small>
        </h2>
        <p>
          read-only observable containing pathname (path w/o querystring) relevant to local router
        </p>
      </section>

      <section>
        <h2 id="canonicalPath">
          canonicalPath
          <small class="text-muted">read-only</small>
        </h2>
        <p>
          read-only observable containing full path
        </p>
      </section>

      <section>
        <h2 id="hash">
          hash
          <small class="text-muted">read-only</small>
        </h2>
        <p>
          read-only observable containing anchor
        </p>
      </section>

      <section>
        <h2 id="update">
          update
          <small class="text-muted">(url, state = {}, push = true, query = false) => {}</small>
        </h2>
        <p>
          updates the context and trigger one update
        </p>
        <p>
          if <code>push === true</code>, use <code>pushState</code>, else <code>replaceState</code>
        </p>
        <p>
          if <code>query</code> is false (or unsupplied), get from parsed querystring from <code>url</code>
          <br>
          if <code>query</code> is an object, set this context's query to the contents
        </p>
      </section>

      <a data-bind="path: '/config'" class="btn btn-primary"><i class="fa fa-arrow-left"></i> config</a>
      <span class="pull-right">
        <a data-bind="path: '/bindings'" class="btn btn-primary">bindings <i class="fa fa-arrow-right"></i></a>
      </span>
    </div>
`})