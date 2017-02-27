require_relative &quot;code&quot;
require &quot;test/unit&quot;
class TestSimpleNumber &lt; Test::Unit::TestCase
def test_simple
assert_equal(4, SimpleNumber.new(2).add(2) )
assert_equal(4, SimpleNumber.new(2).multiply(2) )
end
def test_typecheck
assert_raise( RuntimeError ) { SimpleNumber.new(&#39;a&#39;) }
end
end