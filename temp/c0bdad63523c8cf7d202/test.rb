begin
  gem 'minitest', '>= 5.0.0'
  require 'minitest/autorun'
  require_relative 'code'
rescue Gem::LoadError => e
  puts "
Missing Dependency:
#{e.backtrace.first} #{e.message}"
  puts 'Minitest 5.0 gem must be installed for the xRuby track.'
rescue LoadError => e
  puts "
Error:
#{e.backtrace.first} #{e.message}"
  puts DATA.read
  exit 1
end

# Test data version:
# deb225e Implement canonical dataset for scrabble-score problem (#255)

class HelloWorldTest < Minitest::Test
  def test_no_name
    assert_equal 'Hello, World!', HelloWorld.hello
  end
end
