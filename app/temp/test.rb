
require_relative "code"
require "test/unit"

class TestSimpleNumber < Test::Unit::TestCase

def test_simple
   assert_equal(4, SimpleNumber.new(2).add(2) )
   assert_equal(4, SimpleNumber.new(2).multiply(2) )
 end

 def test_typecheck
   assert_raise( RuntimeError ) { SimpleNumber.new('a') }
 end

end
